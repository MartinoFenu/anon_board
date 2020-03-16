const express = require('express');
const router = express.Router();
const UserController  = require('../controller/user.js');

router.route('/')
  .post(UserController.user_login)

module.exports = router;
