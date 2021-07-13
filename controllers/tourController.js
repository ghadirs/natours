const { v4: uuidv4 } = require("uuid");
const Model = require("../Models/tourModel");
const createQueryMaker = require("../tools/createQueryMaker");
const updateKeyValues = require("../tools/updateQueryMaker");
const checkJson = require("../tools/checkJson");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
// const factory = require("./handlerFactory");

// ROUTE HANDLERS
exports.getAllTours = catchAsync(async (req, res, next) => {
  // BUILD QUERY
  //
  const appModel = new Model();
  const queryObj = { ...req.query };
  const exceludedFields = ["page", "sort", "limit", "fields"];
  exceludedFields.forEach((el) => delete queryObj[el]);

  const query = appModel.getAll(queryObj);

  // EXECUTE QUERY
  const tours = await query;

  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tour: tours,
    },
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  const appModel = new Model();
  appModel.condition = req.params.id;

  const tours = await appModel.getAll();

  if (!tours) {
    return next(new AppError("No tour found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours: tours,
    },
  });
});

exports.createTour = catchAsync(async (req, res, next) => {
  const appModel = new Model();
  appModel.id = uuidv4();
  appModel.json = checkJson(req);
  appModel.columns += Object.keys(req.body);
  appModel.queryQM += createQueryMaker(req);

  await appModel.save([JSON.stringify(req.body)]);

  res.status(201).json({
    status: "success",
  });
});

exports.updateTour = catchAsync(async (req, res, next) => {
  const appModel = new Model();
  appModel.columns = Object.keys(req.body);
  appModel.condition = req.params.id;

  const tours = await appModel.update([updateKeyValues(req.body)]);

  if (!tours) {
    return next(new AppError("No tour found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
  });
});

// exports.deleteTour = factory.deleteOne(Tour)

exports.deleteTour = catchAsync(async (req, res, next) => {
  const appModel = new Model();
  appModel.columns = Object.keys(req.body);
  appModel.condition = req.params.id;

  const tours = await appModel.delete();

  if (!tours) {
    return next(new AppError("No tour found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
  });
});
