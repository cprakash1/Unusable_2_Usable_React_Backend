const express = require("express");
// const router=express.Router({mergeParams:true});
const router = express.Router({ mergeParams: true });
const catchAsync = require("../Utils/catchAsync");
const ChatController = require("../Controller/ChatController");

router.post("/", catchAsync(ChatController.createChat));
router.post("/getChat", catchAsync(ChatController.getChat));
router.post("/allChat", catchAsync(ChatController.getAllChat));

// router.delete("/:chatId", catchAsync(ReviewController.deleteReview));

module.exports = router;
