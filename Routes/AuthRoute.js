const express = require("express");
const router = express.Router();
const AuthController = require("../Controller/AuthController");
const catchAsync = require("../utils/catchAsync");

router.post("/login", catchAsync(AuthController.login));

router.post("/register", catchAsync(AuthController.register));

router.post("/getuser", catchAsync(AuthController.getUser));

router.post("/registerToken", catchAsync(AuthController.registerToken));

router.post("/register", catchAsync(AuthController.register));

router.post(
  "/forgotPasswordToken",
  catchAsync(AuthController.forgotPasswordToken)
);

router.post("/forgotPassword", catchAsync(AuthController.forgotPassword));

module.exports = router;
