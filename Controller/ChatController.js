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
<<<<<<< HEAD
        res.status(400).json({ message: response.message, success: false });
=======
        res.status(400).json({ message: response.message });
>>>>>>> 1b8374ba50070f192f1c256021be3684025fc9f0
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
        res.status(400).json({ message: "No chat found", success: false });
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
        res.status(400).json({ message: "No chat found", success: false });
      }
    } catch (error) {
      throw new Error("Error in Chat Controller:" + error);
    }
  }
}

module.exports = new ChatController();
