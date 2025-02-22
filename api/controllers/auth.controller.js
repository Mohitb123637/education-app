import { errorHandler } from '../../client/utils/error.js';
import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

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

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next(errorHandler(400, 'Email and password are required'));
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, 'User not found'));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, 'Invalid password'));
    }
    const token = jwt.sign(
      {
        id: validUser._id,
      },
      process.env.JWT_SECRET
    );
    const { password: pass, ...rest } = validUser._doc;

    res
      .status(200)
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};
