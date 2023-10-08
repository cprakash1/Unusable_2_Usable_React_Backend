const ExpressError = require("../Utils/expressError");
const ReviewService = require("../Services/ReviewService");

module.exports.createReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await ReviewService.createAReview(id, req.body);
    res.status(200).json({ item, success: true });
  } catch (err) {
    throw new ExpressError("Error in Review Controller" + err, 500);
  }
};

module.exports.deleteReview = async (req, res, next) => {
  try {
    const item = await ReviewService.deleteReview(req.params);
    res.status(200).json({ item, success: true });
  } catch (err) {
    throw new ExpressError("Error in Review Controller" + err, 500);
  }
};
