const mongoose    = require("mongoose");
const Threads     = require('../models/threads.js');
const Replies     = require('../models/replies.js');
const bcrypt      = require('bcrypt');
const saltRounds  = 10;

const threadQuery = id => {
  return Threads
  .findOne({ _id: id })
  .populate({
    path: 'replies',
    select: '-delete_password -reported',
    options: {
      sort: { created_on: -1},
    }
  })
  .select('-delete_password -reported')
};

exports.get_thread_with_replies = async (req, res) => {
  try{
    const thread = await threadQuery(req.params.thread_id).exec();
    if(!thread) return res.status(404).send('cannot find thread')
    else return res.status(200).json(thread);
  } catch(err){
    return err.kind === 'ObjectId' ? res.status(404).send(`cannot find thread`) : res.status(500).send('An error occured retrieving the thread')
  }
}

exports.post_new_reply = async (req, res) => {
  const id = req.params.thread_id;
  try {
    const thread =  await threadQuery(req.params.thread_id).exec();
    if(!thread) return res.status(404).send('cannot find thread')
    else {
      const hash = await bcrypt.hash(req.body.delete_password, saltRounds)
      const newReply = new Replies({
        thread_id: id,
        _id: new mongoose.Types.ObjectId(),
        text: req.body.text,
        delete_password: hash
      });
      const savedReply = await newReply.save();
      if(savedReply) {
        thread.replies.unshift(savedReply);
        thread.bumped_on = new Date().toISOString();
        thread.repliescount++;
        const updatedThread = thread.save();
        const { delete_password, ...responseReply} = savedReply._doc;
        if(updatedThread) return res.status(200).json(responseReply);
        else return res.status(500).send('An error occured saving this reply')
      }
    }
  } catch(err) {
    return err.kind === 'ObjectId' ? res.status(404).send(`cannot find thread`) : res.status(500).send('An error occured saving this reply')
  }
}

exports.report_reply = async (req, res) => {
  try{
    const reply = Replies.findByIdAndUpdate(
      req.body.reply_id,
      { reported: true }
    ).exec();

    if(!reply) return res.status(404).send('cannot find reply');
    else return res.status(200).send('success');
  } catch(err) {
    return err.kind === 'ObjectId' ? res.status(404).send(`cannot find reply`) : res.status(500).send('An error occured reporting this reply')
  }
}

exports.delete_reply = async (req, res) => {
  try {
    const reply = await Replies.findById(req.body.reply_id).exec();
    if(!reply) return res.status(404).send('cannot find reply');
    else {
      if(!res.locals.isAuthenticated){
        const match = await bcrypt.compare(req.body.delete_password, reply.delete_password);
        if(!match) return res.status(401).json({ error: 'incorrect password' });
      }
      reply.text = '[deleted]';
      const updatedReply = await reply.save();
      if(updatedReply) return res.status(200).send({id: req.body.reply_id});
    }
  } catch(err) {
    return err.kind === 'ObjectId' ? res.status(404).send(`cannot find reply`) : res.status(500).send('An error occured deleting this reply')
  }
}
