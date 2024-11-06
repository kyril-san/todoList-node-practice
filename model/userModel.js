const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const helper = require('../utils/helpers');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'The user must have a Name'],
  },
  email: {
    type: String,
    required: [true, 'A user must have an email to Sign in'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please Provide a valid Email'],
  },
  password: {
    type: String,
    required: [true, 'A password is required'],
    select: false,
    minlength: 4,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please Confirm your password'],
    validate: function (el) {
      return el === this.password;
    },
    message: 'Passwords are not the same',
  },
  role: {
    type: String,
    enum: ['Admin', 'User'],
    default: 'User',
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  // this.password = await helper.hashPassword(this.password);
  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.comparePasswords = async function (
  userPassword,
  databasePassword
) {
  return await bcrypt.compare(userPassword, databasePassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
