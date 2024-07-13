const ChatService = require("../Services/ChatService");

class ChatController {
  async createChat(req, res) {
    try {
      const { body } = req;
      const campground = req.params.id;
      const response = await ChatService.createChat(body, campground);
      if (response.success) {
        res.status(201).json(response.chat);
      } else {
        res.status(400).json({ message: response.message });
      }
    } catch (error) {
      throw new Error("Error in Chat Controller:" + error);
    }
  }
  async getChat(req, res) {
    try {
      const { body } = req;
      const campground = req.params.id;
      const response = await ChatService.getChat(body, campground);
      if (response) {
        res.status(200).json(response);
      } else {
        res.status(400).json({ message: "No chat found" });
      }
    } catch (error) {
      throw new Error("Error in Chat Controller:" + error);
    }
  }
  async getAllChat(req, res) {
    try {
      const { user } = req.body;
      const campground = req.params.id;
      const response = await ChatService.getAllChat(campground, user);
      if (response) {
        res.status(200).json(response);
      } else {
        res.status(400).json({ message: "No chat found" });
      }
    } catch (error) {
      throw new Error("Error in Chat Controller:" + error);
    }
  }
}

module.exports = new ChatController();
