var express = require("express");
var router = express.Router();

const messages = require("../controller/messages");

/* GET home page. */
router.get("/messages", messages.list);
router.post("/messages", messages.create);
router.put("/messages/:messageId", messages.edit);
router.delete("/message/:_id", messages.remove);

module.exports = router;
