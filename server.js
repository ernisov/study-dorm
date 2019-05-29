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

    let dorm1 = parseRoomsFromSVG(dorms.D1.F1, 1, 1).then(res => {
      d1f1 = res.roomDescriptions;
    });

    let dorm2 = parseRoomsFromSVG(dorms.D1.F2, 1, 2).then(res => {
      d1f2 = res.roomDescriptions;
    });

    Promise.all([dorm1, dorm2]).then(() => {
      let rooms = [...d1f1, ...d1f2];
      Room.insertMany(rooms);
    });
  }
}).catch(err => console.log(err));

app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/users'));
app.use('/announcements', require('./routes/announcements'));
app.use('/rooms', require('./routes/rooms'));
app.use('/applications', require('./routes/applications'));
app.use('/api', require('./routes/api'));
app.use('/swagger.yml', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'swagger.yml'));
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`started on port ${port}`));
