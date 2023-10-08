const Campground = require("../models/items");
const Review = require("../models/buyers");
const ExpressError = require("../utils/expressError");

module.exports.createAReview = async (id, rev, user) => {
  try {
    const camp = await Campground.findById(id);
    const review = new Review(rev);
    review.author = user;
    camp.reviews.push(review);
    await review.save();
    await camp.save();
    return await Campground.findById(id);
  } catch (err) {
    throw new ExpressError("Error in Buyer Reprojectory" + err, 500);
  }
};

module.exports.deleteReview = async (id, reviewId) => {
  try {
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    return await Campground.findById(id);
  } catch (err) {
    throw new ExpressError("Error in Reviewer Reprojectory" + err, 500);
  }
};
