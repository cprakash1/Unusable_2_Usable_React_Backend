const ReviewReprository = require("../Reprository/ReviewReprository");
const ExpressError = require("../utils/expressError");

module.exports.createAReview = async (id, obj) => {
  if (!obj || !obj.user || !obj.body || !obj.cost || !id) {
    throw new ExpressError("Please provide all details", 500);
  }
  try {
    const { user, body, cost } = obj;
    const review = { cost, body };
    return await ReviewReprository.createAReview(id, review, user);
  } catch (err) {
    throw new ExpressError("Error in Review Service" + err, 500);
  }
};

module.exports.deleteReview = async (obj) => {
  try {
    const { id, reviewId } = obj;
    if (!id || !reviewId) {
      throw new ExpressError("please provide all the details", 500);
    }
    return await ReviewReprository.deleteReview(id, reviewId);
  } catch (err) {
    throw new ExpressError("Error in Review Service" + err, 500);
  }
};
