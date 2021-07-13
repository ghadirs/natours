const { v4: uuidv4 } = require("uuid");
const UserModel = require("../Models/userModel");
const createQueryMaker = require("../tools/createQueryMaker");
const updateKeyValues = require("../tools/updateQueryMaker");
const checkJson = require("../tools/checkJson");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getAllUsers = catchAsync(async (req, res, next) => {
  // BUILD QUERY
  //
  const userModel = new UserModel();

  const query = userModel.getAll();

  // EXECUTE QUERY
  const users = await query;

  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      tour: users,
    },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const userModel = new UserModel();
  userModel.condition = req[0] || req.params.id;

  const users = await userModel.getAll();

  if (!users) {
    return next(new AppError("No tour found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users: users,
    },
  });
});

// exports.createUser = catchAsync(async (req, res, next) => {
//   const userModel = new UserModel();
//   userModel.id = uuidv4();
//   userModel.json = checkJson(req);
//   userModel.columns += Object.keys(req.body);
//   userModel.queryQM += createQueryMaker(req);

//   await userModel.save([JSON.stringify(req.body)]);

//   if (!userModel.result) {
//     return next(new AppError(`${userModel.error}`, 500));
//   }

//   res.status(201).json({
//     status: "success",
//   });
// });

exports.updateUser = catchAsync(async (req, res, next) => {
  const userModel = new UserModel();
  userModel.columns = Object.keys(req.body);
  userModel.condition = req.params.id;

  const users = await userModel.update([updateKeyValues(req.body)]);

  if (!users) {
    return next(new AppError("No tour found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const userModel = new UserModel();
  userModel.columns = Object.keys(req.body);
  userModel.condition = req.params.id;

  const users = await userModel.delete();

  if (!users) {
    return next(new AppError("No tour found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
  });
});
