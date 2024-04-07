const express = require("express");
const router = express.Router();
const messages = require("../controller/messages.controller");
const { isAuthenticated } = require("../controller/auth.controller");

router.get("/", messages.list);
router.post("/", isAuthenticated, messages.create);
router.get("/:_id", isAuthenticated, messages.getMessage);
router.put("/:_id", isAuthenticated, messages.updateMessage);
router.delete("/:_id", isAuthenticated, messages.deleteMessage);

module.exports = router;
