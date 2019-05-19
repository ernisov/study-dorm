const express = require('express');
const path = require('path');
const mongoose = require('./db/mongoose');
const config = require('config');
const authenticate = require('./middleware/auth');

const app = express();
app.use(express.json());

app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/users'));
app.use('/announcements', require('./routes/announcements'));
app.use('/api', require('./routes/api'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`started on port ${port}`));
