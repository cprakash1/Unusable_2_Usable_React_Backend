const ChatRepository = require("../Reprository/ChatRepository");
const { getAItem } = require("./ItemService");

class ChatService {
  async createChat(obj, campground_id) {
    try {
      if (
        !obj ||
        !obj.user ||
        !obj.text ||
        !campground_id ||
        !obj.costOffered
      ) {
        throw new Error("Please provide all details");
      }
      const res = await getAItem(campground_id);
      const reciever_id = res.author._id;
      const sender_id = obj.user;

      const chat = {
        text: obj.text,
        sender: sender_id,
        receiver: reciever_id,
        campground: campground_id,
        costOffered: obj.costOffered,
        isAuthor: obj.isAuthor,
      };
      return await ChatRepository.createChat(chat);
    } catch (err) {
      throw new Error("Error in Chat Service:" + err);
    }
  }
  async getChat(obj, campId) {
    try {
      const { user } = obj;
      const res = await getAItem(campId);
      const reciever_id = res.author._id;
      if (!campId || !user || !reciever_id) {
        throw new Error("Please provide all details");
      }
      const resp = await ChatRepository.getChat({
        campId,
        sender: user,
        receiver: reciever_id,
      });
      return resp;
    } catch (err) {
      throw new Error("Error in Chat Service:" + err);
    }
  }
  async getAllChat(campId, receiver) {
    try {
      console.log(campId, receiver);
      if (!campId || !receiver) {
        throw new Error("Please provide all details");
      }
      const res = await getAItem(campId);
      const reciever_id = res.author._id;
      if (!reciever_id) {
        throw new Error("No reciever found");
      }
      if (reciever_id.equals(receiver) === false) {
        throw new Error("You are not authorized to view this chat");
      }
      return await ChatRepository.getAllChat(campId, receiver);
    } catch (err) {
      throw new Error("Error in Chat Service:" + err);
    }
  }
}

module.exports = new ChatService();
