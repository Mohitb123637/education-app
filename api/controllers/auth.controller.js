import { errorHandler } from '../../client/utils/error.js';
import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';

export const signup = async (req, res, next) => {
  const { userName, name, email, password, contact, address } = req.body;
  if (
    !userName ||
    !name ||
    !email ||
    !password ||
    !contact ||
    !address ||
    userName === '' ||
    email === '' ||
    password === '' ||
    contact === '' ||
    address === ''
  ) {
    next(errorHandler(400, 'All fields are required'));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = User({
    userName,
    name,
    email,
    password: hashedPassword,
    contact,
    address,
  });
  try {
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    next(error);
  }
};
