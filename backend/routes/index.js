var express = require("express");
var router = express.Router();

const controller = require("../controller/list");

/* GET home page. */
router.get("/messages", controller.list);
router.post("/messages", controller.create);
router.put("/messages/:_id", controller.edit);
// router.delete("/message/:_id", controller.delete);  TODO

module.exports = router;
