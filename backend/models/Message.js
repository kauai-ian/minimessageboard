const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    body: {type: String, required: true}, 
    author: {type: mongoose.Schema.Types.ObjectId,
    ref: 'User'},
    timestamp: String,
    createdDate: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// every time a message is updated and saved to the database, the updatedAt field will automatically be updated.
schema.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
});
module.exports = mongoose.model("Message", schema);