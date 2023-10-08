const ExpressError = require("../Utils/expressError");
const AuthReprository = require("../Reprository/AuthReprository.js");
const bcrypt = require("../Utils/bcrypt.js");
const jwt = require("../Utils/JwtLiberary.js");
const otp = require("../Utils/otpGenerator.js");
const sendMail = require("../Nodemailer/SendMail.js");

module.exports.login = async ({ username, password }) => {
  try {
    if (!username || !password) {
      throw new ExpressError("Invalid username or password", 400);
    } else {
      const loggedInUser = await AuthReprository.getUserByUsername(username);
      if (!loggedInUser) {
        throw new ExpressError("Invalid username or password", 400);
      }
      if (bcrypt.comparePassword(password, loggedInUser.password)) {
        return loggedInUser._id;
      } else {
        throw new ExpressError("Invalid username or password", 400);
      }
    }
  } catch (err) {
    throw new ExpressError("Error in Service/AuthService" + err, 500);
  }
};

module.exports.register = async (newUser) => {
  try {
    if (
      !newUser ||
      !newUser.pin ||
      !newUser.password ||
      !newUser.registerToken
    ) {
      throw new ExpressError("Invalid username or password", 400);
    }
    if (!jwt.verifyTokenUsingOtp(newUser.registerToken, newUser.pin)) {
      throw new ExpressError("Invalid register token", 400);
    }
    const { username, email } = jwt.verifyTokenUsingOtp(
      newUser.registerToken,
      newUser.pin
    );
    const { password } = newUser;
    const user = await AuthReprository.register({
      username,
      password: bcrypt.hashPassword(password),
      email,
    });
    return user._id;
  } catch (err) {
    throw new ExpressError("Error in Service/AuthService" + err, 500);
  }
};

module.exports.getUser = async ({ access_token }) => {
  try {
    if (!access_token) {
      throw new ExpressError("Invalid access token", 400);
    }
    if (!jwt.verifyToken(access_token)) {
      throw new ExpressError("Invalid access token", 400);
    }
    const user = await AuthReprository.getUserById(
      jwt.decodeToken(access_token).user
    );
    return user._id;
  } catch (err) {
    throw new ExpressError("Error in Service/AuthService" + err, 500);
  }
};

module.exports.registerToken = async ({ username, email }) => {
  try {
    if (!username || !email) {
      throw new ExpressError("Invalid username or email", 400);
    }
    const newOtp = otp.generateOtp();
    //otp sender
    sendMail.SendMail({ username, email, message: "OTP / PIN : " + newOtp });

    const registerToken = jwt.createTokenUsingOtp({ username, email }, newOtp);
    return registerToken;
  } catch (err) {
    throw new ExpressError("Error in Service/AuthService" + err, 500);
  }
};

module.exports.forgotPasswordToken = async ({ username }) => {
  try {
    if (!username) {
      throw new ExpressError("Invalid username", 400);
    }

    const { email, _id } = await AuthReprository.getUserByUsername(username);
    if (!email) {
      throw new ExpressError("Invalid username", 400);
    }

    const newOtp = otp.generateOtp();
    //otp sender
    sendMail.SendMail({ username, email, message: "OTP / PIN : " + newOtp });
    const forgotPasswordToken = jwt.createTokenUsingOtp({ id: _id }, newOtp);
    return forgotPasswordToken;
  } catch (err) {
    throw new ExpressError("Error in Service/AuthService" + err, 500);
  }
};

module.exports.forgotPassword = async ({
  forgotPasswordToken,
  pin,
  password,
}) => {
  try {
    if (!forgotPasswordToken || !pin || !password) {
      throw new ExpressError(
        "Invalid forgot password token or pin or password",
        400
      );
    }
    if (!jwt.verifyTokenUsingOtp(forgotPasswordToken, pin)) {
      throw new ExpressError("Invalid forgot password token or pin", 400);
    }
    const { id } = jwt.verifyTokenUsingOtp(forgotPasswordToken, pin);
    await AuthReprository.updateUserPassword(id, bcrypt.hashPassword(password));
  } catch (err) {
    throw new ExpressError("Error in Service/AuthService" + err, 500);
  }
};
