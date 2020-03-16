const express             = require('express');
const router              = express.Router();
const checkAuth           = require('../middleware/auth');
const BoardController     = require('../controller/boards.js');
const validator           = require('../middleware/validator');
const { checkSchema }     = require('express-validator');
const { newBoardSchema }  = require('../models/validationSchemas');

router.route('/')
  .get(BoardController.get_all_boards)
  .post(checkSchema(newBoardSchema), validator, checkAuth, BoardController.post_new_board)
  .delete(checkAuth, BoardController.delete_board);

module.exports = router;
