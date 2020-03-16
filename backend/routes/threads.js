const express           = require('express');
const router            = express.Router();
const ThreadController  = require('../controller/threads.js');
const checkAuth         = require('../middleware/auth');
const validator         = require('../middleware/validator');
const { checkSchema }   = require('express-validator');
const { deletePassword, newThreadSchema } = require('../models/validationSchemas');

router.route('/:board_id')
  .get(ThreadController.get_recent_threads)
  .post(checkSchema(newThreadSchema), validator, ThreadController.post_new_thread)
  .delete(checkAuth, checkSchema(deletePassword), validator,   ThreadController.delete_thread)
  .patch(ThreadController.report_thread);

module.exports = router;
