import express from 'express';
import smsController from '../controllers/smsController';

const smsRoutes = express.Router();

smsRoutes.post('/send', smsController.createMessage);
smsRoutes.get('/messages', smsController.getAllMessages);
smsRoutes.get('/contact/:_id/message/sent', smsController.getAllMessagesSentByAContact);
smsRoutes.get('/contact/:_id/message/received', smsController.getAllMessagesSentToAContact);

export default smsRoutes;