// Remove the duplicate declaration of User
// const User = require("../model/user");

const User = require("../models/user.js");

const ExpressError = require("../Utils/expressError");

module.exports.register = async (newUser) => {
  try {
    const user = await User.create(newUser);
    return user;
  } catch (err) {
    throw new ExpressError("Error in Reprository/AuthReprository" + err, 500);
  }
};

module.exports.getUserByUsername = async (username) => {
  try {
    const user = await User.findOne({ username });
    return user;
  } catch (err) {
    throw new ExpressError("Error in Reprository/AuthReprository" + err, 500);
  }
};

module.exports.getUserById = async (id) => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (err) {
    throw new ExpressError("Error in Reprository/AuthReprository" + err, 500);
  }
};

module.exports.updateUserPassword = async (id, password) => {
  try {
    await User.findByIdAndUpdate(id, { password });
  } catch (err) {
    throw new ExpressError("Error in Reprository/AuthReprository" + err, 500);
  }
};
