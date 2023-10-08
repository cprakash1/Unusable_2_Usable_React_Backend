const Campground = require("../models/items");
const ExpressError = require("../Utils/expressError");
// const {} =require("../Utils/expressError.js")
const mbxgeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const geocoder = mbxgeocoding({
  accessToken:
    "pk.eyJ1IjoiY3ByYWthc2gxIiwiYSI6ImNsZzZpNXBpMjBkZzkzaHFyMm83OGQyN3YifQ.5BnzbS1hsEGKg95hwpbQ7Q",
});
const { cloudinary } = require("../Cloudinary/index.js");

module.exports.getAllItems = async () => {
  try {
    const items = await Campground.find({});
    return items;
  } catch (err) {
    throw new ExpressError("Error got in Reprository Item" + err, 500);
  }
};

module.exports.createAItem = async (obj, user) => {
  try {
    const { title, location, price, description } = obj;
    const camp = await new Campground({
      title,
      location,
      price,
      description,
    });
    if (obj.files) {
      camp.image = obj.files;
    }
    camp.author = user;
    const geoData = await geocoder
      .forwardGeocode({
        query: location,
        limit: 1,
      })
      .send();
    camp.geometry = geoData.body.features[0].geometry;
    await camp.save();
    return camp;
  } catch (err) {
    throw new ExpressError("Error got in Reprository Item" + err, 500);
  }
};

module.exports.getAItem = async (id) => {
  try {
    const camp = await Campground.findById(id)
      .populate({
        path: "reviews",
        populate: {
          path: "author",
        },
      })
      .populate("author");
    // console.log(camp);
    if (!camp) {
      throw new ExpressError("Error got in Reprository Item", 500);
    } else {
      return camp;
    }
    // console.log(camp);
  } catch (err) {
    throw new ExpressError("Error got in Reprository Item" + err, 500);
  }
};

module.exports.getAItemForEdit = async (id) => {
  try {
    const item = await Campground.findById(id);
    if (!item) {
      throw new ExpressError("Error got in Reprository Item", 500);
    } else return item;
  } catch (err) {
    throw new ExpressError("Error got in Reprository Item" + err, 500);
  }
};

module.exports.submitEditedItem = async (obj) => {
  try {
    const { title, location, price, description, id } = obj;
    if (!title || !location || !price || !description || !id)
      throw new ExpressError("Invalid Campground Data", 400);
    const camp = await Campground.findByIdAndUpdate(id, {
      title,
      location,
      price,
      description,
    });
    // const im = obj.files.map((f) => ({ url: f.path, filename: f.filename }));
    if (obj.files) {
      obj.files.forEach((f) => camp.image.push(f));
    }
    await camp.save();
    if (obj.deleteimage) {
      obj.deleteimage.forEach(async (val) => {
        await camp.updateOne({
          $pull: { image: { _id: { $in: val._id } } },
        });
      });
      // console.log(req.body.deleteimage);
      for (let p of obj.deleteimage) {
        await cloudinary.uploader.destroy(p.filename);
      }
    }
    return await Campground.findById(camp._id);
  } catch (err) {
    throw new ExpressError("Error got in Reprository Item" + err, 500);
  }
};

module.exports.deleteAItem = async (id) => {
  return await Campground.findByIdAndDelete(id);
};
