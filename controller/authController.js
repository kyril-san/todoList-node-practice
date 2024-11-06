const jwt = require('jsonwebtoken');
const user = require('../model/userModel');
const { promisify } = require('util');

exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token)
    return res.status(401).json({
      status: 'Unauthorized',
      message: 'You are not Logged In',
    });

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await user.findById(decoded.id);

  if (!currentUser)
    return res.status(404).json({
      status: 'Not Found',
      message: 'The User with this token does not exist',
    });

  req.user = currentUser;

  next();
};
