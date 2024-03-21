const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    title: String, 
    text: String,
    userId: {type: mongoose.Schema.Types.ObjectId,
    ref: 'User'},
    timestamp: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Message", schema);