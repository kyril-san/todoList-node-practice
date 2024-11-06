const CatchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/ApiFeatures');

exports.CreateData = (model) => async (req, res) => {
  try {
    const data = await model.create(req.body);
    res.status(201).json({
      status: 'success',
      data: data,
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error.message,
    });
  }
};

exports.GetallData = (model) => async (req, res) => {
  try {
    let filter = {};

    if (req.params.id) filter = { id: req.params.id };

    const features = new APIFeatures(
      model.find(filter).where('user').equals(req.user.id),
      req.query
    ).filter();
    // .sort()
    // .limitFields()
    // .paginate();

    const data = await features.query;
    // const data = await model.find().where('user').equals(req.user.id);
    res.status(200).json({
      status: 'success',
      length: data.length,
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

exports.GetData = (model) => async (req, res) => {
  try {
    const id = req.params.id;
    const data = await model.findById(id).where('user').equals(req.user.id);

    if (!data)
      return res.status(404).json({
        status: 'fail',
        message: `No data is found with this id`,
      });

    res.status(200).json({
      status: 'success',
      data: data,
    });
  } catch (error) {
    return res.status(404).json({
      status: 'fail',
      message: error.message,
    });
  }
};

exports.UpdateData = (model) => async (req, res) => {
  try {
    const id = req.params.id;
    const data = await model.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!data)
      return res.status(404).json({
        status: 'fail',
        message: `No data was found with this id`,
      });

    res.status(200).json({
      status: 'success',
      data: data,
    });
  } catch (error) {
    return res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

exports.DeleteData = (model) => async (req, res) => {
  try {
    const data = await model.findByIdAndDelete(req.params.id);

    if (!data)
      return res.status(404).json({
        success: 'Fail',
        message: 'No data was found with this id',
      });

    res.status(204).json({
      status: 'Success',
      data: null,
    });
  } catch (error) {
    if (!data)
      return res.status(400).json({
        success: 'Fail',
        message: error.message,
      });
  }
};
