const Chat = require("../models/chat");

class ChatRepository {
  async createChat(obj) {
    try {
      const prevChat = await Chat.findOne({
        campground: obj.campground,
        sender: obj.sender,
        receiver: obj.receiver,
      });
      if (prevChat) {
        prevChat.message.push({ text: obj.text, isAuthor: obj.isAuthor });
        prevChat.costOffered = obj.costOffered;
        await prevChat.save();
        return { success: true };
      } else {
        const chat = await Chat.create(obj);
        chat.message.push({ text: obj.text, isAuthor: obj.isAuthor });
        await chat.save();
        return { success: true };
      }
    } catch (err) {
      throw new Error("Error in Chat Repository:" + err);
    }
  }
  async getChat({ campId, sender, receiver }) {
    try {
      return await Chat.findOne({
        campground: campId,
        sender: sender,
        receiver: receiver,
      });
    } catch (err) {
      throw new Error("Error in Chat Repository:" + err);
    }
  }
  async getAllChat(campId, receiver) {
    try {
      return await Chat.find({
        campground: campId,
        receiver: receiver,
      }).populate("sender", "username _id");
    } catch (err) {
      throw new Error("Error in Chat Repository:" + err);
    }
  }
}

module.exports = new ChatRepository();
