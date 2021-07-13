const express = require("express");
const {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const {
  signup,
  login,
  forgotPassword,
} = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signup);
// router.post("/login", login);

// router.post("/forgotPassword", forgotPassword);

router.route("/").get(getAllUsers);

router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
