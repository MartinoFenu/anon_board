const mongoose  = require("mongoose");
const Boards    = require('../models/boards.js');

exports.get_all_boards = async (req, res) => {
  try {
    const boards = await Boards.find({}).exec();
    if(!boards) return res.status(404).send('No boards where found')
    else return res.status(200).send(boards)
  } catch(err) {
    return res.status(500).send('An error occured retrieving the information')
  }
}

exports.post_new_board = async (req, res) => {
  if(!res.locals.isAuthenticated)
    return res.status(401).json({
        error: 'Auth failed'
    });
  else {
    try {
      const newBoard = new Boards ({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name.toLowerCase(),
        description: req.body.description
      })
      const board = await newBoard.save();

      if(!board) return res.status(500).send('there was an error saving the board')
      else return res.status(200).json({ name: board.name})
    } catch(err) {
      return res.status(500).send('An error occured saving the board')
    }
  }
}

exports.delete_board = async (req, res) => {
  if(!res.locals.isAuthenticated)
    return res.status(401).json({
        error: 'Auth failed'
    });
    else {
      try{
        const board = await Boards
          .findOneAndDelete( { _id: req.body.board_id } )
          .exec();
        if(!board) return res.status(404).send('cannot find board');
        else return res.status(200).send('success');
        } catch(err) {
        return err.kind === 'ObjectId' ? res.status(404).send(`cannot find board`) : res.status(500).send('An error occured deleting this board')
      }
    }
}
