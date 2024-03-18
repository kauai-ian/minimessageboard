const Messages = require("../models/Messages");
const { body, validationResult } = require("express-validator");

// get all messages app.METHOD(PATH, HANDLER)
exports.list = async (req, res) => {
  try {
    const messages = await Messages.find();
    res.json("index", { Messages: messages }); // pass the messages to the view
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};

// create message
exports.create = async (req, res, next) => {
  const validationRules = [
    body("title").notEmpty().withMessage("Title is required"),
    body("text").notEmpty().withMessage("Text is required"),
    body("user").notEmpty().withMessage("user is required"),
    body("timestamp").notEmpty().withMessage("Timestamp is required"),
  ];
  const errors = validationResult(req); // checks validation
  if (!errors.isEmpty()) {
    return next(createError(400, { errors: errors.array() }));
  }

  // validation passed
  try {
    const { title, text, user, timestamp } = req.body;
    const message = new Messages({ title, text, user, timestamp });
    await message.save();
    res.json({ message: "message create success!", data: message });
  } catch (error) {
    next(error);
  }
};

// delete message

// edit message
exports.edit = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const { text } = req.body;

    // find message by ID
    const updatedMessage = await Messages.findByIdAndUpdate(
      _id,
      { text },
      { new: true }
    );

    res.json(updatedMessage);
  } catch (error) {
    next(error);
  }
};
