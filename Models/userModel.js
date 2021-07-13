const crypto = require("crypto");
const validator = require("express-validator");
const bcrypt = require("bcryptjs");

const Model = require("../system/Model");
const AppError = require("../utils/appError");

module.exports = class Users extends Model {
  constructor() {
    super();
    this.id = "";
    this.password = "";
    this.passwordResetToken = "";
    this.table = "users";
    this.columns = "";
    this.condition = "";
    this.limit = "";
    this.json = "";
    this.queryQM = "";
    this.save = async (body, next) => {
      if (this.password === body.password_confirm) {
        console.log("Password is ok");
        this.password = await bcrypt.hash(this.password, 12);
        body.password_confirm = null;
        return await this.add();
      } else {
        next(new AppError("Passwords does not match.", 400));
      }
    };
    this.getAll = async (values) => {
      return await this.select(values);
    };
    this.update = async (values) => {
      console.log(values);
      return await this.insert(values);
    };
    this.delete = async () => {
      return await this.remove();
    };
  }

  createPasswordResetToken() {
    const resetToken = crypto.randomBytes(32).toString("hex");

    this.passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    console.log({ resetToken }, this.passwordResetToken);

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    return resetToken;
  }
};
