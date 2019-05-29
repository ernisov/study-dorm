const mongoose = require('mongoose');
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

RoomSchema.statics.getRooms = function(dormitory, floor) {
  let Room = this;
  return Room.find({ dormitory, floor }).then(docs => {
    return docs.map(room => ({
      id: room.id,
      dormitory: room.dormitory,
      floor: room.floor,
      type: room.type,
      number: room.number,
      tenants: room.tenants
    }));
  });
};

const Room = mongoose.model('room', RoomSchema);
module.exports = Room;
