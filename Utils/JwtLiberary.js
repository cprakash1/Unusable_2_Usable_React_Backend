const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

module.exports.createToken = (user) => {
  const token = jwt.sign({ user }, SECRET);
  return token;
};

module.exports.verifyToken = (token) => {
  const decoded = jwt.verify(token, SECRET);
  return decoded;
};

module.exports.decodeToken = (token) => {
  const decoded = jwt.decode(token, SECRET);
  return decoded;
};

module.exports.createTokenUsingOtp = (obj, otp) => {
  const token = jwt.sign(obj, SECRET + otp);
  return token;
};

module.exports.verifyTokenUsingOtp = (token, otp) => {
  const decoded = jwt.verify(token, SECRET + otp);
  return decoded;
};
