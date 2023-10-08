require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const AuthRouter = require("./Routes/AuthRoute");
const ItemRoute = require("./Routes/ItemRoute");
const ReviewRoute = require("./Routes/ReviewRoute");
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const PORT = process.env.PORT || 80;
const MONGODB_URI = process.env.MONGODB_URI;
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.use((req, res, next) => {
  console.log(req.url, req.method);
  // console.log(req.session)
  // console.log(req.user)
  // console.log(req.query)
  next();
});

app.use("/", AuthRouter);
app.use("/items", ItemRoute);
app.use("/items/:id/reviews", ReviewRoute);
// app.post("/upload", async (req, res) => {
//   // const image = req.files.map((f) => ({ url: f.path, filename: f.filename }));
//   console.log(req.body.name, req.files);
// });

app.use((err, req, res, next) => {
  console.log(err);
  const { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).json({ error: message, success: false });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
