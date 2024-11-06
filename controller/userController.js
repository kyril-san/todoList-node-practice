const user = require('../model/userModel');
const jwt = require('jsonwebtoken');
const handleFunction = require('./handleFunction');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);

  // res.cookie('jwt', token, {
  //   expires: new Date(
  //     Date.now() + process.env.JWT_EXPIRES_IN * 24 * 60 * 60 * 1000
  //   ),
  //   httpOnly: true,
  //   secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
  // });
  user.password = undefined;
  user.role = undefined;

  res.status(statusCode).json({
    status: 'success',
    token: token,
    user: user,
  });
};

exports.CreateUser = async (req, res) => {
  try {
    const newUser = await user.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });
    createSendToken(newUser, 201, req, res);
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error.message,
    });
  }
};

exports.LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(404).json({
        status: 'Please Provide and email and password',
        message: error.message,
      });

    const loggeduser = await user.findOne({ email }).select('+password');
    if (
      !loggeduser ||
      !(await loggeduser.comparePasswords(password, loggeduser.password))
    )
      return res.status(404).json({
        status: 'fail',
        message: error.message,
      });

    createSendToken(loggeduser, 201, req, res);
  } catch (error) {
    return res.status(404).json({
      status: 'fail',
      message: error.message,
    });
  }
};

exports.GetallUser = handleFunction.GetallData(user);

exports.GetUser = handleFunction.GetData(user);
