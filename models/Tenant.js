const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const SETTLEMENT_STATUS = {
  NOT_APPLIED: 'not_applied',
  NOT_SETTLED: 'not_settled',
  SETTLED: 'settled'
};

const TenantSchema = new Schema({
  roomNumber: String,
  settlementStatus: {
    type: String,
    required: true,
    default: SETTLEMENT_STATUS.NOT_APPLIED
  },
  _user: {
    type: String,
    required: true,
  }
});

TenantSchema.plugin(mongoosePaginate);


const Tenant = mongoose.model('tenant', TenantSchema);

module.exports = Tenant;
