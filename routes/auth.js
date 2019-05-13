const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const authenticate = require('../middleware/auth');

const User = require('../models/User');

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  User.findByCredentials(username, password).then((user) => {
    if (!user) return Promise.reject();
    user.generateAuthTokens().then(tokens => {
      res.status(200).json({
        username,
        role: user.role,
        ...tokens
      });
    });
  }).catch((err) => res.status(401).send(err));
});

router.post('/refresh-token', (req, res) => {
  // get refresh token
  // verify expiration and with db
  // if valid => generate new access token and refresh token
  // -- save refresh token in db
  // -- respond with new access token and refresh token
  // else => redirect to login
});

router.post('/logout', (req, res) => {
  // delete refresh token in database
});

module.exports = router;
