const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    body: {type: String, required: true}, 
    author: {type: mongoose.Schema.Types.ObjectId,
    ref: 'User'},
    timestamp: String,
    createdDate: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Message", schema);