const Message = require("../models/Message");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const createError = require("http-errors");
const response = require("../helpers/response");

// get all messages app.METHOD(PATH, HANDLER)
exports.list = async (req, res) => {
  try {
    const messages = await Message.find().populate("author").sort({ createdDate: -1});
    return response({
      res,
      status: 200,
      message: "Messages recieved",
      data: messages,
    }); // pass the messages to the view
  } catch (error) {
    console.error(error);
    return response({
      res,
      status: 500,
      message: "Server error",
    });
  }
};

// create message
exports.create = async (req, res, next) => {
  let statusCode = 200;
  try {
    console.log("request body", req.body)
    if (!req?.body) {
      statusCode = 400;
      throw new Error("Request body is missing");
    }

    const { body, _id } = req.body;
    if (!body || !_id) {
      statusCode = 400;
      throw new Error("Missing required fields");
    }
    // Ensure the user exists
    const user = await User.findById(_id);
    if (!user) {
      statusCode = 400;
      throw new Error("User does not exist");
    }

    const newMessage = new Message({ body, author: _id });
    await newMessage.save();
    console.log("new message", newMessage);

    return response({
      res,
      status: 201,
      message: "Message created",
      data: {
        ...newMessage.toObject(),
        author: user,
      },
    });
  } catch (error) {
    console.error(error);
    return response({
      res,
      status: statusCode,
      message: error.message,
    });
  }
};


exports.getMessage = async (req, res) => {
  try {
    const { _id } = req.params;
    if (!_id) {
      return response({
        res,
        status: 400,
        message: "Missing required fields",
      });
    }

    const message = await Message.findById(_id)
      .populate("author");
    return response({
      res,
      status: 200,
      message: "Message retrieved",
      data: message,
    });
  } catch (error) {
    console.error(error);
    return response({
      res,
      status: 500,
      message: "Server error",
    });
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    const { _id } = req.params;
    if (!_id) {
      return response({
        res,
        status: 400,
        message: "Missing required fields",
      });
    }

    const message = await Message.findByIdAndDelete(_id);
    if (!message) {
      return response({
        res,
        status: 404,
        message: "Message not found",
      });
    }

    return response({
      res,
      status: 200,
      message: "Message deleted",
    });
  } catch (error) {
    console.error(error);
    return response({
      res,
      status: 500,
      message: "Server error",
    });
  }
};


exports.updateMessage = async (req, res) => {
  try {
    const { _id } = req.params;
    const { userId, body } = req.body;
    if (!_id || !userId || !body) {
      return response({
        res,
        status: 400,
        message: "Missing required fields",
      });
    }

    const message = await Message.findById(_id);
    if (!message) {
      return response({
        res,
        status: 404,
        message: "Message not found",
      });
    }
    console.log("message.author", message.author);
    if (message.author.toString() !== userId) {
      return response({
        res,
        status: 403,
        message: "Unauthorized",
      });
    }

    const newMessage = await Message.findByIdAndUpdate(
      _id,
      { body },
      { new: true }
    );
    await newMessage.save();

    return response({
      res,
      status: 200,
      message: "Message updated",
      data: newMessage,
    });
  } catch (error) {
    console.error(error);
    return response({
      res,
      status: 500,
      message: "Server error",
    });
  }
};
