import User from '../models/user';

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
