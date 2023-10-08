const ExpressError = require("../utils/expressError");
const AuthServices = require("../services/AuthService.js");
const jwt = require("../Utils/JwtLiberary.js");

module.exports.login = async (req, res, next) => {
  try {
    const user = await AuthServices.login(req.body);
    res
      .status(200)
      .json({ id: user, access_token: jwt.createToken(user), success: true });
  } catch (err) {
    throw new ExpressError("Error in Controller/AuthController" + err, 500);
  }
};

module.exports.register = async (req, res, next) => {
  try {
    const user = await AuthServices.register(req.body);
    res
      .status(200)
      .json({ id: user, access_token: jwt.createToken(user), success: true });
  } catch (err) {
    throw new ExpressError("Error in Controller/AuthController" + err, 500);
  }
};

module.exports.getUser = async (req, res, next) => {
  try {
    const user = await AuthServices.getUser(req.body);
    res.status(200).json({ id: user, success: true });
  } catch (err) {
    throw new ExpressError("Error in Controller/AuthController" + err, 500);
  }
};

module.exports.registerToken = async (req, res, next) => {
  try {
    const registerToken = await AuthServices.registerToken(req.body);
    res.status(200).json({ registerToken, success: true });
  } catch (err) {
    throw new ExpressError("Error in Controller/AuthController" + err, 500);
  }
};

module.exports.forgotPasswordToken = async (req, res, next) => {
  try {
    const forgotPasswordToken = await AuthServices.forgotPasswordToken(
      req.body
    );
    res.status(200).json({ forgotPasswordToken, success: true });
  } catch (err) {
    throw new ExpressError("Error in Controller/AuthController" + err, 500);
  }
};

module.exports.forgotPassword = async (req, res, next) => {
  try {
    await AuthServices.forgotPassword(req.body);
    res.status(200).json({ success: true });
  } catch (err) {
    throw new ExpressError("Error in Controller/AuthController" + err, 500);
  }
};
