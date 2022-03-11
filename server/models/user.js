import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const { Schema } = mongoose.Schema;

const userSchema = new Schema(
  {
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
  },
  { timestamps: true }
);

userSchema.pre('save', function (next) {
  if (user.isModified('password')) {
    return bcrypt.hash(this.password, 12, function (err, hash) {
      if (err) {
        console.log('Password Hash Error', err);
        return next(err);
      }
      user.password = hash;
      return next();
    });
  } else {
    return next();
  }
});

export default mongoose.model('User', userSchema);
