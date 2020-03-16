const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const repliesSchema = new Schema({
  thread_id: { type: Schema.Types.ObjectId, required: true },
  _id: Schema.Types.ObjectId,
  text: { type: String },
  delete_password: { type: String },
  reported: { type: Boolean, default: false },
  created_on: String
})

repliesSchema.pre('save', function(next) {
  if(this.isNew) {
    const now = new Date().toISOString();
    this.created_on = now;
  }
  next();
});

module.exports = mongoose.model('Replies', repliesSchema);
