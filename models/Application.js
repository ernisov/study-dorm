const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
  approved: {
    type: Boolean,
    default: false
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

const Application = mongoose.model('application', ApplicationSchema);
module.exports = Application;
