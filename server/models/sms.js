import mongoose, { mongo } from 'mongoose';

const { Schema } = mongoose;

mongoose.Promise = global.Promise;

const SmsSchema = new Schema ({
  sender: {
    type: String,
  },

  receiver: {
    type: String,
  },

  message: {
    type: String,
  },
  smsstatus: {
    type: String
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

export default mongoose.model('Sms', SmsSchema);