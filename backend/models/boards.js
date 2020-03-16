const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

const boardsSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: { type: String, required: true, unique: true },
  description: { type: String, default: '' },
  created_on: String,
  threads: [{ type: Schema.Types.ObjectId, ref: 'Threads' }],
  threadscount: { type: Number, default: 0 }
});

boardsSchema.pre('save', function(next) {
  const now = new Date().toISOString();
  this.created_on = now;
  next();
});

boardsSchema.post('findOneAndDelete', function(doc, next) {
  //removing threads and replies after removing board
  doc.threads.forEach(el => {
    mongoose.model('Replies').deleteMany({ thread_id: el }).exec();
  })
  mongoose.model('Threads').deleteMany({ board: doc._id }).exec();
  next();
})

module.exports = mongoose.model('Boards', boardsSchema);
