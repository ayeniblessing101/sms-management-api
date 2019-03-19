import Contact from '../models/Contact';
import { validateCreateContactInput } from '../validations/validations';
import Sms from '../models/Sms';

exports.createContact = (req, res) => {
    validateCreateContactInput(req);

    const requestErrors = req.validationErrors();
    const newContact =  new Contact({
        name: req.body.name,
        phonenumber: req.body.phonenumber
    });
    if (requestErrors) {
        res.status(400).json({ errors: requestErrors });
    } else {
        Contact.findOne({ name: req.body.phonenumber })
            .then((existingPhoneNumber) => {
                if (existingPhoneNumber) {
                    return res.status(409).json({
                        error: 'Contact with this name already exist',
                    });
                }
                newContact.save().then((contactDetail) => {
                    return res.status(201).json({
                        newContact: {
                            contactId: contactDetail._id,
                            name: contactDetail.name,
                            phonenumber: contactDetail.phonenumber
                        },
                        message: 'Contact created successfully',
                    });
                });
            })
        .catch((error) => {
            return res.status(500).json({ error });
        });
    }
};

exports.getAContacts = (req, res) => {
    Contact.findById(req.params._id)
        .then((response) => {
            if (response) {
                return res.status(200).json({
                    contact: {
                        contactId: response._id,
                        name: response.name,
                        phonenumber: response.phonenumber
                    },
                });
            }
            return res.status(404).json({ message: 'Contact not Found' });
        })
        .catch((error) => {
            return res.status(500).json({ error })
        });
};

exports.getAllContacts = (req, res) => {
    Contact.find()
        .then((response) => {
            if (response) {
                return res.status(200).json({
                    contacts: response
                });
            }
            return res.status(404).json({ message: 'Contact not Found' });
        })
        .catch((error) => {
            return res.status(500).json({ error })
        });
};

exports.deleteContact = (req, res) => {
    Contact.findById(req.params._id)
        .then((contact) => {
            if (contact) {
                contact.remove();
                contact.save();
                res.status(200).json({ message: 'Contact deleted successfully' });
            } else {
                return res.status(404).json({ message: 'Contact not found '});
            }
        })
        .catch((error) => {
            return res.status(500).json({ error })
        });
};