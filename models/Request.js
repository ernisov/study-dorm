const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const requestCategories = {
  PLUMBING: 'plumbing',
  CARPENTRY: 'carpentry',
  ELECTRICITY: 'electricity',
  OTHER: 'other'
};

const requestStatuses = {
  NOT_FIXED: 'not_fixed',
  IN_PROGRESS: 'in_progress',
  FIXED: 'fixed'
};

const RequestSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    default: requestStatuses.NOT_FIXED
  },
  room: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  category: {
    type: String,
    default: requestCategories.OTHER
  },
  executor: String
});

RequestSchema.plugin(mongoosePaginate);

const Request = mongoose.model('request', RequestSchema);

module.exports = Request;
