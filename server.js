const express = require('express');
const path = require('path');
const mongoose = require('./db/mongoose');
const config = require('config');
const authenticate = require('./middleware/auth');
const { parseRoomsFromSVG } = require('./utils/roomUtils');
let dorms = require('./data/dorms');
const Room = require('./models/Room');

const app = express();
app.use(express.json());

Room.find({}).then((rooms) => {
  if (rooms.length === 0) {
    let d1f1;
    let d1f2;
    let d2f1;
    let d2f2;
    let d3f1;
    let d3f2;

    let dorm1 = parseRoomsFromSVG(dorms.D1.F1, 1, 1).then(res => {
      d1f1 = res.roomDescriptions;
    });

    let dorm2 = parseRoomsFromSVG(dorms.D1.F2, 1, 2).then(res => {
      d1f2 = res.roomDescriptions;
    });

    let dorm3 = parseRoomsFromSVG(dorms.D2.F1, 2, 1).then(res => {
      d2f1 = res.roomDescriptions;
    });

    let dorm4 = parseRoomsFromSVG(dorms.D2.F2, 2, 2).then(res => {
      d2f2 = res.roomDescriptions;
    });

    let dorm5 = parseRoomsFromSVG(dorms.D3.F1, 3, 1).then(res => {
      d3f1 = res.roomDescriptions;
    });

    let dorm6 = parseRoomsFromSVG(dorms.D3.F2, 3, 2).then(res => {
      d3f2 = res.roomDescriptions;
    });

    Promise.all([dorm1, dorm2, dorm3, dorm4, dorm5, dorm6]).then(() => {
      let rooms = [...d1f1, ...d1f2].concat(d2f1, d2f2, d3f1, d3f2);
      Room.insertMany(rooms);
    });
  }
}).catch(err => console.log(err));

app.use('/v1', require('./router'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`started on port ${port}`));
