var express = require("express");
var router = express.Router();

const messages = require("../controller/messages.controller");

/* GET home page. */
router.get("/messages", messages.list);
router.post("/messages", messages.create);
router.put("/messages/:messageId", messages.edit);
router.delete("/messages/:messageId", messages.remove);  

module.exports = router;
