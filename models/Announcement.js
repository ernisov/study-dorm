const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const AnnouncementSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  date: {
    type: Date,
    default: Date.now
  },
  author: {
    type: String,
    required: true
  }
});

AnnouncementSchema.plugin(mongoosePaginate);

const Announcement = mongoose.model('announcement', AnnouncementSchema);
module.exports = Announcement;
