import Contact from '../models/Contact';
import { validateCreateContactInput } from '../validations/validations';

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
        Contact.findOne({ name: req.body.name })
            .then((existingTitle) => {
                if (existingTitle) {
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
    Contact.findById(req.id)
        .then((response) => {
            if (response) {
                return res.status(200).json({
                    contact: {
                        contactId: response.id,
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

exports.deleteContact = () => {
    
}