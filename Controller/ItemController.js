const ExpressError = require("../Utils/expressError");
const ItemService = require("../Services/ItemService");

module.exports.IndexPage = async (req, res, next) => {
  try {
    const items = await ItemService.getAllItems();
    res.status(200).json({ items, success: true });
  } catch (err) {
    throw new ExpressError("Error got in Controller Item" + err, 500);
  }
};

module.exports.CreateItem = async (req, res, next) => {
  try {
    const obj = req.body;
    const files = req.files;
    const item = await ItemService.createAItem(obj, files);
    res.status(200).json({ item, success: true });
  } catch (err) {
    throw new ExpressError("Error got in Controller Item" + err, 500);
  }
};

module.exports.ShowItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await ItemService.getAItem(id);
    res.status(200).json({ item, success: true });
  } catch (err) {
    throw new ExpressError("Error got in Controller Item" + err, 500);
  }
};

module.exports.UpdateItem = async (req, res, next) => {
  try {
    const obj = req.body;
    if (req.body.deleteimage)
      obj.deleteimage = JSON.parse(req.body.deleteimage);
    const files = req.files;
    const item = await ItemService.submitEditedItem(obj, files);
    res.status(200).json({ item, success: true });
  } catch (err) {
    throw new ExpressError("Error got in Controller Item" + err, 500);
  }
};

module.exports.DeleteItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await ItemService.deleteAItem(id);
    res.status(200).json({ item, success: true });
  } catch (err) {
    throw new ExpressError("Error got in Controller Item" + err, 500);
  }
};
