import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

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
  const user = this;

  if (user.isModified('password')) {
    return bcrypt.hash(user.password, 12, function (err, hash) {
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

userSchema.methods.comparePassword = function (password, next) {
  bcrypt.compare(password, this.password, function (error, match) {
    if (error) {
      console.log('COMPARE PASSWORD ERROR');
      return next(error, false);
    }
    console.log('MATCH PASSWORD', match);
    return next(null, match);
  });
};

export default mongoose.model('User', userSchema);
