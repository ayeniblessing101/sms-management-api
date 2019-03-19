import express from 'express';
import contactController from '../controllers/contactController';

const contactRoutes = express.Router();

contactRoutes.post('/contact', contactController.createContact);
contactRoutes.get('/contact/:_id', contactController.getAContacts);
contactRoutes.get('/contacts', contactController.getAllContacts);
contactRoutes.delete('/contact/:_id', contactController.deleteContact);

export default contactRoutes;