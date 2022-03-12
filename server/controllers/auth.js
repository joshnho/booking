import User from '../models/user';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;

  if (!name) return res.status(400).send('Name is required');
  if (!password || password.length < 6)
    return res.status(400).send('Password is invalid');

  let userExist = await User.findOne({ email }).exec();
  if (userExist) return res.status(400).send('Email is taken');

  const user = new User(req.body);
  try {
    await user.save();
    console.log('User Created', user);
    return res.json({ created: true });
  } catch (error) {
    console.log('Create User Failed', error);
    return res.status(400).send('Error. Try again.');
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).exec();

    if (!user) res.status(400).send('Account not found');

    user.comparePassword(password, (error, match) => {
      if (!match || error) return res.status(400).send('Invalid credentials');
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
      });
      res.json({
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          stripe_account_id: user.stripe_account_id,
          stripe_seller: user.stripe_seller,
          stripeSession: user.stripeSession,
        },
      });
    });
  } catch (error) {
    console.log('Login failed', error);
    res.status(400).send('Login failed');
  }
};
