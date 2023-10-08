const ExpressError = require("../utils/expressError");
const ItemReprository = require("../Reprository/ItemReprository.js");

module.exports.getAllItems = async () => {
  try {
    const items = await ItemReprository.getAllItems();
    return items;
  } catch (err) {
    throw new ExpressError("Error got in Service Item" + err, 500);
  }
};

module.exports.createAItem = async (obj, files) => {
  try {
    if (
      !obj ||
      !obj.user ||
      !obj.title ||
      !obj.location ||
      !obj.price ||
      !obj.description
    ) {
      throw new ExpressError("Provide all the details", 500);
    }
    if (files) {
      obj.files = files.map((f) => ({ url: f.path, filename: f.filename }));
    }
    const item = await ItemReprository.createAItem(obj, obj.user);
    return item;
  } catch (err) {
    throw new ExpressError("Error got in Service Item" + err, 500);
  }
};

module.exports.getAItem = async (id) => {
  try {
    if (!id) {
      throw new ExpressError("Provide all the details", 500);
    }
    const item = await ItemReprository.getAItem(id);
    return item;
  } catch (err) {
    throw new ExpressError("Error got in Service Item" + err, 500);
  }
};

module.exports.submitEditedItem = async (obj, files) => {
  try {
    if (
      !obj ||
      !obj.id ||
      !obj.title ||
      !obj.location ||
      !obj.price ||
      !obj.description
    ) {
      throw new ExpressError("Provide all the details", 500);
    }
    if (files) {
      obj.files = files.map((f) => ({ url: f.path, filename: f.filename }));
    }
    const item = await ItemReprository.submitEditedItem(obj);
    return item;
  } catch (err) {
    throw new ExpressError("Error got in Service Item" + err, 500);
  }
};

module.exports.deleteAItem = async (id) => {
  try {
    if (!id) {
      throw new ExpressError("Provide all the details", 500);
    }
    const item = await ItemReprository.deleteAItem(id);
    return item;
  } catch (err) {
    throw new ExpressError("Error got in Service Item" + err, 500);
  }
};
