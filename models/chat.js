const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new Schema(
  {
    costOffered: {
      type: Number,
      required: true,
      default: 0,
    },
    // message is object of array having sender, receiver and text
    message: [
      {
        isAuthor: {
          type: Boolean,
          required: true,
          default: false,
        },
        text: {
          type: String,
          required: true,
        },
      },
    ],
    blocked: {
      type: Boolean,
      default: false,
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    campground: {
      type: Schema.Types.ObjectId,
      ref: "Campground",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chat", chatSchema);
