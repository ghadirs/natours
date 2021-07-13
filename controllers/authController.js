const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");

const UserModel = require("../Models/userModel");
const createQueryMaker = require("../tools/createQueryMaker");
const checkJson = require("../tools/checkJson");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { getUser } = require("./userController");
const sendEmail = require("../utils/email");

exports.signup = catchAsync(async (req, res, next) => {
  const userModel = new UserModel();
  userModel.id = uuidv4();
  userModel.json = checkJson(req);
  userModel.columns += Object.keys(req.body);
  userModel.queryQM += createQueryMaker(req);
  userModel.password = req.body.pass;

  // await userModel.save(req.body)
  const newUser = await userModel.save(
    {
      name: req.body.name,
      email: req.body.email,
      pass: req.body.pass,
      password_confirm: req.body.password_confirm,
    },
    next
  );

  const token = jwt.sign({ id: newUser[1] }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  if (!newUser[0]) {
    return next(new AppError(`${newUser.error}`, 500));
  }

  res.status(201).json({
    status: "success",
    token,
    data: {
      id: newUser[1],
      user: newUser,
    },
  });
});

exports.login = async (req, res, next) => {
  const { email, pass } = req.body;
  const newUser = new UserModel();
  this.password = pass;

  // 1 Check if email and password exists
  if (!email || !pass) {
    return next(new AppError("Please provide email and passwod", 400));
  }
  // 2 check if user exists && password is correct
  const userEmail = await newUser.getAll({
    email: email,
  });
  // if (userEmail === userPassword) {
  //   console.log("logged in");
  // }

  // 3 If everything ok, send token to client

  const token = "1asa";

  res.status(200).json({
    status: "success",
    token,
  });
};

exports.protect = catchAsync(async (req, res, next) => {
  // 1 getting the token
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not logged in, please log in to get access.", 401)
    );
  }
  // 2 verification

  // 3 check user still exists

  // 4 check if user changed password after token was issued

  next();
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // Get user based on POSTed email
  // const user = await getUser([req.body]);
  // if (!user) {
  //   return next(new AppError(`There is no user with email address`, 404));
  // }

  // Generate the random reset token
  // const resetToken = user.createPasswordResetToken();
  // await user.save();
  await sendEmail({
    from: "Ghadri shoamdaot <asf@asikfas.com>",
    to: "options.email",
    subject: "gu",
    text: "kose nnat",
  });
  res.status(200).json({
    status: "success",
  });
});
