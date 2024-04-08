const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const schema = new mongoose.Schema({
  username: { type: String, required: true },
  joinedDate: { type: Date, default: Date.now },
});
// passport-local-mongoose does password handling for us
schema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", schema);
