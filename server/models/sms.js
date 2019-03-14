import mongoose from 'mongoose';

const { Schema } = mongoose;

mongoose.Promise = global.Promise;

const SmsSchema = new Schema ({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contact',
  },

  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contact',
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