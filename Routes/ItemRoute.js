const express = require("express");
const router = express.Router();
const catchAsync = require("../Utils/catchAsync");
const ItemController = require("../Controller/ItemController");
const { storage } = require("../Cloudinary/index.js");
const multer = require("multer");
const upload = multer({ storage });

router
  .route("/:id")
  .get(catchAsync(ItemController.ShowItem))
  .put(upload.array("image"), catchAsync(ItemController.UpdateItem))
  .delete(catchAsync(ItemController.DeleteItem));

router
  .route("/")
  .get(catchAsync(ItemController.IndexPage))
  .post(
    upload.array("image", { timeout: 60000 }, function (err, result) {
      console.log(err, result);
    }),
    catchAsync(ItemController.CreateItem)
  );

module.exports = router;
