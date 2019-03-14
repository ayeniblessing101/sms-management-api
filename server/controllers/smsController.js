import Sms from '../models/Sms';
import Contact from '../models/Contact';

import { validateSmsInput } from '../validations/validations';

exports.createSms = (req, res) => {
    validateSmsInput(req);

    const requestErrors = req.validationErrors();

    const newSms = new Sms({
        sender: req.body.sender,
        receiver: req.body.receiver,
        message: req.body.message,
        smsstatus: 'unread'
    });
    if (requestErrors) {
        res.status(400).json({ errors: requestErrors });
    } else {
        Contact.find({ sender: req.body.sender, receiver: req.body.receiver })
        .then((contact) => {
            if (contact) {
                newSms.save().then((smsDetail) => {
                    res.status(201).json({
                        sms: {
                            sender: contact.sender,
                            receiver: contact.receiver,
                            message: smsDetail.message,
                            smsstatus: smsDetail.smsstatus
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