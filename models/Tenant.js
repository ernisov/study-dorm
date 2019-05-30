const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const SETTLEMENT_STATUS = {
  NOT_APPLIED: 'not_applied',
  NOT_SETTLED: 'not_settled',
  SETTLED: 'settled'
};

const TenantSchema = new Schema({
  room: String,
  settlementStatus: {
    type: String,
    required: true,
    default: SETTLEMENT_STATUS.NOT_APPLIED
  },
  username: {
    type: String,
    required: true,
  }
});

TenantSchema.plugin(mongoosePaginate);

TenantSchema.methods.toJSON = function() {
  var obj = this.toObject();
  return {
    settlementStatus: obj.settlementStatus,
    username: obj.username,
    room: obj.room
  };
};

const Tenant = mongoose.model('tenant', TenantSchema);

module.exports = Tenant;
