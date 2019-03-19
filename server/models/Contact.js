import mongoose from 'mongoose';
import Sms from './Sms';

const { Schema } = mongoose;

mongoose.Promise = global.Promise;

const ContactSchema = new Schema ({
  name: {
    type: String,
    trim: true,
    required: 'Please enter your name'
  },

  phonenumber: {
    type: Number,
    trim: true,
    required: 'Please enter your phone number'
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

ContactSchema.pre('remove', function(next) {
  Sms.remove({ sender: this._id }).exec();
  Sms.remove({ receiver: this._id }).exec();
  next();
});

export default mongoose.model('Contact', ContactSchema);