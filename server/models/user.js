import mongoose from 'mongoose';

const { Schema } = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 64,
  },
  stripe_account_id: '',
  stripe_seller: {},
  stripeSession: {},
});

export default mongoose.model('User', userSchema);
