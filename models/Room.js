const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
  number: {
    type: Number,
    required: true,
    min: 0
  },
  tenants: [{ type: Schema.Types.ObjectId }],
  dormitory: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  floor: {
    type: Number,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  }
});

const Room = mongoose.model('room', RoomSchema);

module.exports = Room;
