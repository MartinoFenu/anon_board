const express           = require('express');
const router            = express.Router();
const RepliesController = require('../controller/replies.js');
const checkAuth         = require('../middleware/auth');
const validator         = require('../middleware/validator');
const { checkSchema }   = require('express-validator');
const { deletePassword, newReplySchema } = require('../models/validationSchemas');

router.route('/:thread_id')
  .get(RepliesController.get_thread_with_replies)
  .post(checkSchema(newReplySchema), validator, RepliesController.post_new_reply)
  .patch(RepliesController.report_reply)
  .delete(checkAuth, checkSchema(deletePassword), validator,  RepliesController.delete_reply);

module.exports = router;
