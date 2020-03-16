const mongoose    = require("mongoose");
const Threads     = require('../models/threads.js');
const Boards      = require('../models/boards.js');
const bcrypt      = require('bcrypt');
const saltRounds  = 10;

exports.get_recent_threads = async (req, res) => {
  const id = req.params.board_id;
  try {
    //if the user goes directly to the board search with its name
    const query =  {$or: [{name: id}]};
    if(mongoose.Types.ObjectId.isValid(id)) query.$or.push({_id: id});
    const threads = await Boards
      .findOne(query)
      .populate({
        path: 'threads',
        select: '-delete_password -reported', //negating fields
        options: {
          limit: 10,
          sort: { bumped_on: -1},
        }
      })
      .select('-delete_password -reported')
      .exec()

    if(!threads) return res.status(404).send('This board does not exist')
    else return res.status(200).send(threads)
  } catch(err) {
    return err.kind === 'ObjectId' ? res.status(404).send(`cannot find thread`) : res.status(500).send('An error occured retrieving the threads')
  }
}

exports.post_new_thread = async (req, res) => {
  const id = req.params.board_id;
  const body = req.body;
  try{
    const board = await Boards.findById({ _id: id }).exec();
    if(!board) return res.status(404).send('cannot find board');
    else {
      const hash = await bcrypt.hash(req.body.delete_password, saltRounds);
      const newThread = new Threads({
        board, //_id
        _id: new mongoose.Types.ObjectId(),
        title: body.title,
        text: body.text,
        delete_password: hash
      });
      const thread = await newThread.save();
      if(thread) {
        board.threads.push(newThread);
        board.bumped_on = new Date().toISOString();
        board.threadscount++;
        const updatedBoard = board.save();
        if(!updatedBoard) return res.status(500).send('There was an error saving the thread')
        else return res.send({board: board.name, thread: thread._id})
      }
    }
  } catch(err) {
    return err.kind === 'ObjectId' ? res.status(404).send(`cannot find board`) : res.status(500).send('An error occured saving the thread');
  }
};

exports.report_thread = async (req, res) => {
  try {
    const thread = await Threads
      .findByIdAndUpdate(
        req.body.thread_id,
        { reported: true } )
      .exec();
    if(!thread) return res.status(404).send('cannot find thread')
    else return res.status(200).send('success')
  }catch(err) {
    return err.kind === 'ObjectId' ? res.status(200).send(`cannot find thread`) : res.status(500).send('An error occured reporting this thread')
  }
}

exports.delete_thread = async (req, res) => {
  try{
    const thread = await Threads.findById( { _id: req.body.thread_id } ).exec();
    if(!thread) res.status(404).send('cannot find thread');
    else {
      if(!res.locals.isAuthenticated) {
        const match = await bcrypt.compare(req.body.delete_password, thread.delete_password);
        if(!match) return res.status(401).json({ error: 'incorrect password' });
      }
      await thread.remove();
      return res.status(200).send('success');
    }
  }catch(err) {
    return err.kind === 'ObjectId' ? res.status(404).send(`cannot find thread`) : res.status(500).send('An error occured deleting this thread')
  }
}
