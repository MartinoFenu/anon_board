const mongoose  = require('mongoose');
const Replies   = require('./replies.js');
const Schema    = mongoose.Schema;

const threadSchema = new Schema({
  board: { type: Schema.Types.ObjectId },
  _id: Schema.Types.ObjectId,
  title: { type: String, required: true },
  text: { type: String, required: true },
  reported: { type: Boolean, default: false },
  delete_password: { type: String, required: true },
  replies: [
    { type: Schema.Types.ObjectId, ref: 'Replies' }
  ],
  repliescount: { type: Number, default: 0},
  created_on: String,
  bumped_on: String
})

//prefill date on save
threadSchema.pre('save', function(next) {
  const now = new Date().toISOString();
  this.created_on = now;
  this.bumped_on = now;
  next();
});

threadSchema.post('remove', function(doc, next) {
  //removing replies
  mongoose.model('Boards').findByIdAndUpdate(
    doc.board,
    {
      $pull: { threads: doc._id },
      $inc: { threadscount: -1 }
    }
  ).exec();
  Replies.deleteMany({ thread_id: doc._id }).exec();
  next();
})

module.exports = mongoose.model('Threads', threadSchema);
