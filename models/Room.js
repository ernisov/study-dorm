const mongoose = require('../db/mongoose');
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
  id: {
    type: String,
    unique: true,
    required: true
  },
  dormitory: Number,
  floor: Number,
  number: Number,
  type: String,
  tenants: [{
    username: String,
    firstName: String,
    lastName: String,
    role: String,
  }],
  maxTenants: Number,
  available: Boolean
});

const Room = mongoose.model('room', RoomSchema);
module.exports = Room;
