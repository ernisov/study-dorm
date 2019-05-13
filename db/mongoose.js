const mongoose = require('mongoose');
const config = require('config');
const User = require('../models/User');

mongoose.Promise = global.Promise;
mongoose.connect(config.get('mongoURI'), {
  useNewUrlParser: true,
  useCreateIndex: true
}).then(() => {
  User.findOne({ username: 'admin' }).then((user) => {
    if (!user) {
      let admin = new User({
        username: 'admin',
        password: 'admin',
        role: 'admin'
      });

      admin.save().then((doc) => console.log(doc));
    }
  }).catch(err => console.log(err));
}).catch(err => console.log(err));

module.exports = mongoose;
