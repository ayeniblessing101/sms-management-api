import express from 'express';
import smsController from '../controllers/smsController';

const smsRoutes = express.Router();

smsRoutes.post('/send', smsController.createMessage);
smsRoutes.get('/messages', smsController.getAllMessages);
// smsRoutes.get('/contact/message/', smsController.getMessagesSentToAUser);
s// msRoutes.get('/contact/message/', smsController.getMessagesSentByAUser);

export default smsRoutes;