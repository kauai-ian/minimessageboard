const Messages = require("../models/Messages");
const { body, validationResult } = require("express-validator");
const createError = require("http-errors");

// get all messages app.METHOD(PATH, HANDLER)
exports.list = async (req, res) => {
  try {
    const messages = await Messages.find();
    res.status(200).json({ data: messages }); // pass the messages to the view
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// create message
exports.create = async (req, res, next) => {
  const validationRules = [
    body("title").notEmpty().withMessage("Title is required").escape(),
    body("text").notEmpty().withMessage("Text is required").escape(),
    body("user").notEmpty().withMessage("user is required").escape(),
    body("timestamp").notEmpty().withMessage("Timestamp is required").escape(),
  ];
  const errors = validationResult(req); // checks validation
  if (!errors.isEmpty()) {
    return next(createError(400, { errors: errors.array() }));
  }

  // validation passed
  try {
    const { title, text, user } = req.body;
    const message = new Messages({ title, text, user, timestamp: Date.now() });
    await message.save();
    res.status(201).json({ message: "message create success!", data: message });
  } catch (error) {
    next(error);
  }
};

// edit message by using the id and update in express
exports.edit = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const { text } = req.body;
    // don't update if text is empty
    if (!text) {
      return next(createError(400, "Text is required"));
    }

    // find message by ID
    const updatedMessage = await Messages.findByIdAndUpdate(
      _id,
      { text: text },
      { new: true }
    );

    res.status(200).json({ data: updatedMessage });
  } catch (error) {
    next(error);
  }
};

// TODO: delete message

exports.remove = async (req, res, next) => {
  try {
    const { _id } = req.params;
    await Messages.findByIdAndDelete(_id);
    res.status(200).json({ message: "message deleted successfully" });
  } catch (error) {
    next(error);
  }
}
