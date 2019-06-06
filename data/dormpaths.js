const D1F1 = require('./D1F1.json');
const D1F2 = require('./D1F2.json');
const D2F1 = require('./D2F1.json');
const D2F2 = require('./D2F2.json');
const D3F1 = require('./D3F1.json');
const D3F2 = require('./D3F2.json');

let rooms = 0;
rooms += D1F1.rooms.length;
rooms += D1F2.rooms.length;
rooms += D2F1.rooms.length;
rooms += D2F2.rooms.length;
rooms += D3F1.rooms.length;
rooms += D3F2.rooms.length;

console.log('rooms', rooms);

module.exports = {
  D1: {
    F1: D1F1,
    F2: D1F2
  },
  D2: {
    F1: D2F1,
    F2: D2F2
  },
  D3: {
    F1: D3F1,
    F2: D3F2
  }
};
