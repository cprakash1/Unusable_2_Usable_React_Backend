const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    mongoose
      .connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("MongoDB Connected..."))
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
