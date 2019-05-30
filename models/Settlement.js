const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const SettlementSchema = new Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  username: {
    type: String,
    required: true
  },
  action: {
    type: String,
    required: true
  },
  to: String,
  from: String,
  by: {
    type: String,
    required: true
  }
});

SettlementSchema.plugin(mongoosePaginate);

const Settlement = mongoose.model('settlement', SettlementSchema);
module.exports = Settlement;
