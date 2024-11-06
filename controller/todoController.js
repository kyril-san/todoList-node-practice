const todo = require('../model/todoModel');
const handleFunction = require('./handleFunction');

exports.setUserIds = (req, res, next) => {
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getallTodo = handleFunction.GetallData(todo);

exports.getTodo = handleFunction.GetData(todo);

exports.CreateTodo = handleFunction.CreateData(todo);

exports.UpdateTodo = handleFunction.UpdateData(todo);

exports.DeleteTodo = handleFunction.DeleteData(todo);
// exports.UpdateTodo = async (req, res) => {
//   try {
//     const updateTodo = await Todo.findByIdAndUpdate(id);
//     res.status(200).json({
//       status: "Success",
//     });
//   } catch (error) {
//     res.status(404).json({
//       status: "Fail",
//       error: error.message,
//     });
//   }
// };
