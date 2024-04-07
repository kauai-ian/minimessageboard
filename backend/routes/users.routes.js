const router = require('express').Router();
const users = require('../controller/users.controller');

router.get('/', users.listUsers);
router.get('/:_id', users.getUser);
router.put('/:_id', users.createOrUpdateUser);

module.exports = router;