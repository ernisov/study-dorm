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

RoomSchema.methods.hasTenant = function(username) {
  var room = this;
  let searched = room.tenants.find(t => t.username === username);
  return searched ? true : false;
};

RoomSchema.methods.addTenant = function(tenant) {
  var room = this;
  let tenantObj = {
    username: tenant.username,
    firstName: tenant.firstName,
    lastName: tenant.lastName,
    role: tenant.role
  };

  room.tenants.push(tenantObj);
};

RoomSchema.methods.removeTenant = function(username) {
  var room = this;
  let tenantIndex = room.tenants.findIndex(t => t.username === username);
  if (tenantIndex > -1) room.tenants.splice(tenantIndex, 1);
};

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
