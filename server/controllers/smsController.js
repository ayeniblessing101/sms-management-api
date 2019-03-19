import Sms from '../models/Sms';
import Contact from '../models/Contact';

import { validateSmsInput } from '../validations/validations';
import contactRoutes from '../routes/contactRoutes';

exports.createMessage = (req, res) => {
    validateSmsInput(req);

    const requestErrors = req.validationErrors();

    const newSms = new Sms({
        sender: req.body.sender,
        receiver: req.body.receiver,
        message: req.body.message,
        smsstatus: req.body.smsstatus
    });
    if (requestErrors) {
        res.status(400).json({ errors: requestErrors });
    } else {
        Contact.find({ sender: req.body.sender, receiver: req.body.receiver })
        .then((contact) => {
            if (contact) {
                newSms.save().then((smsDetail) => {
                    res.status(201).json({
                        message: smsDetail.message ,
                        savedSms: {
                            sender: smsDetail.sender,
                            receiver: smsDetail.receiver,
                            smsstatus: smsDetail.smsstatus,
                            createdAt: smsDetail.createdAt,
                            updatedAt: smsDetail.updatedAt
                        }
                    });
                });
            } else {
                return res.status(404).json({ message: 'Contact not found' });
            }
        })
        .catch((err) => {
            return res.status(500).json({ err,  message: 'Internal server error' });
        });
    }
};

exports.getAllMessagesSentByAContact = (req, res) => {
    Sms.find({ sender: req.params._id }, 'message status')
        .populate('sender', 'name phonenumber')
        .then((response) => {
            if (response) {
                res.status(200).json({
                    message: 'Messages fetched successfully',
                    messages: {
                        id: response._id,
                        messages: response
                    }
                });
            } else {
                res.status(404).json({ message: 'This user have not sent any SMS' });
            }
        })
        .catch((e) => {
            return res.status(500).json({ message: 'Internal Server Error', e });
        });
};

exports.getAllMessagesSentToAContact = (req, res) => {
    Sms.find({ receiver: req.params._id }, 'message status')
        .populate('sender', 'name phonenumber')
        .then((response) => {
            if (response) {
                res.status(200).json({
                    message: 'Messages fetched successfully',
                    messages: {
                        id: response._id,
                        messages: response
                    }
                });
            } else {
                res.status(404).json({ message: 'This user have not received any SMS' });
            }
        })
        .catch((e) => {
            return res.status(500).json({ message: 'Internal Server Error', e });
        });
};

exports.getAllMessages = (req, res) => {
    Sms.find({})
        .then((response) => {
            if (response) {
                res.status(200).json({
                    sms: response
                });
            } else {
                res.status(404).json({ message: 'No SMS Found' });
            }
        })
        .catch((e) => {
            return res.status(500).json({ message: 'Internal Server Error', e });
        });
};