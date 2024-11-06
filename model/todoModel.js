const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'You must have a title'],
    trim: true,
  },

  content: String,

  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'User must be Signed In'],
  },
});

// todoSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: 'user',
//   });
//   next();
// });

todoSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: user });
  next();
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
