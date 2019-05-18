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


export const SETTLEMENT_STATUS = {
  NOT_APPLIED: 'not_applied',
  NOT_SETTLED: 'not_settled',
  SETTLED: 'settled'
};
