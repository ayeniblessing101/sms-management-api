import mongoose from 'mongoose';

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
})

export default mongoose.model('Contact', ContactSchema);