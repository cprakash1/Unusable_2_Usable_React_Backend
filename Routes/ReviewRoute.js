const express = require("express");
// const router=express.Router({mergeParams:true});
const router = express.Router({ mergeParams: true });
const catchAsync = require("../Utils/catchAsync");
const ReviewController = require("../Controller/ReviewController");

router.post("/", catchAsync(ReviewController.createReview));

router.delete("/:reviewId", catchAsync(ReviewController.deleteReview));

module.exports = router;
