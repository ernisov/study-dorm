const RoomSchema = new Schema({
  roomNumber: {
    type: String,
    required: true
  },
  dormitory: Number,
  floor: Number,
  tenants: [{
    username: String,
    firstName: String,
    lastName: String,
    role: String,
  }],
  maxTenants: {
    type: Number,
    min: 1
  },
  available: {
    type: Boolean,
    default: true
  }
});

export const ROOM_TYPES = {
  R: 'room',
  C: 'corridor',
  WC: 'WC',
  B: 'bathroom',
  K: 'kitchen'
};

// Room.poselit = function(username) {
//   // max tenants
//   room.tenantes.push(username).then((room) => {
//     user.roomNumber = room.roomNumber;
//     return user.save();
//   });
// }
//
// /rooms/:roomNumber/addTenant {
//
// }
//
// /tenants/move {
//   to: roomNumber?,
//   from: roomNumber?
// }
//
// function settlement({
//   to: roomNumber,
//   from: roomNumber,
//   username: username
// })
// {
//
// }
