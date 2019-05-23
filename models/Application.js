const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const ApplicationSchema = new Schema({
  _user: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  birthDate: {
    type: Date,
    required: true
  },
  passportNumber: {
    type: String,
    required: true
  },
  passportMKK: {
    type: String,
    required: true
  },
  passportDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    default: 'unconsidered'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const MEMBER_TYPES = {
    FATHER: 'father',
    MOTHER: 'mother',
    BROTHER: 'brother',
    SISTER: 'sister'
};

ApplicationSchema.plugin(mongoosePaginate);

const Application = mongoose.model('application', ApplicationSchema);
module.exports = Application;
