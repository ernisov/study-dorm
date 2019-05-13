const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    required: true
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

UserSchema.methods.generateAuthTokens = function() {
  const access = 'auth';
  const accessTokenExp = Math.floor(Date.now() / 1000) + (60 * 30);
  const refreshTokenExp = Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7);

  console.log('accessTokenExp', accessTokenExp);

  const accessToken = jwt.sign({
    username: this.username,
    role: this.role,
    exp: accessTokenExp,
  }, config.get('accessTokenSecret'));

  const refreshToken = jwt.sign({
    username: this.username,
    _id: this._id,
    exp: refreshTokenExp,
    access
  }, config.get('refreshTokenSecret'));

  if (this.tokens.length > 0) {
    let dbToken = this.tokens.find(token => token.access === 'auth');
    dbToken.token = refreshToken;
  } else {
    this.tokens.push({ access, token: refreshToken });
  }

  return this.save().then(() => {
    return {
      accessToken,
      refreshToken,
      accessTokenExp: accessTokenExp * 1000,
      refreshTokenExp: refreshTokenExp * 1000
    };
  });
};



const User = mongoose.model('user', UserSchema);
module.exports = User;
