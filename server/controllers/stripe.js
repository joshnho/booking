import User from '../models/user';
import Stripe from 'stripe';
import queryString from 'query-string';

const stripe = Stripe(process.env.STRIPE_SECRET);

export const createConnectAccount = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).exec();
    if (!user.stripe_account_id) {
      const account = await stripe.accounts.create({
        type: 'express',
      });
      user.stripe_account_id = account.id;
      user.save();
    }
    let accountLink = await stripe.accountLinks.create({
      account: user.stripe_account_id,
      refresh_url: process.env.STRIPE_REDIRECT_URL,
      return_url: process.env.STRIPE_REDIRECT_URL,
      type: 'account_onboarding',
    });
    accountLink = Object.assign(accountLink, {
      'stripe_user[email]': user.email || undefined,
    });
    const link = `${accountLink.url}?${queryString.stringify(accountLink)}`;
    res.send(link);
  } catch (error) {
    console.log('Account connection failed', error);
    res.status(400).send('Account connection failed');
  }
};

export const getAccountStatus = async (req, res) => {
  const user = await User.findById(req.user._id).exec();
  const account = await stripe.accounts.retrieve(user.stripe_account_id);
  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    {
      stripe_seller: account,
    },
    { new: true }
  )
    .select('-password')
    .exec();
  res.json(updatedUser);
};
