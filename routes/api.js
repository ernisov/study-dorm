const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const authenticate = require('../middleware/auth');

const User = require('../models/User');

router.get('/', (req, res) => {
  let accessToken = req.header('x-auth-token');
  jwt.verify(accessToken, config.get('accessTokenSecret'), (err, decoded) => {
    if (err) return res.status(401).send(err);
    res.status(200).json({
      username: decoded.username,
      firstName: decoded.firstName,
      lastName: decoded.lastName,
      role: decoded.role
    });
  });
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  User.findByCredentials(username, password).then((user) => {
    if (!user) return Promise.reject();
    user.generateAuthTokens('mobile').then(tokens => {
      res.status(200).json({
        username,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        ...tokens
      });
    });
  }).catch((err) => res.status(401).send(err));
});

router.get('/refresh-token', (req, res) => {
  let refreshToken = req.header('x-auth-refresh-token');
  jwt.verify(refreshToken, config.get('refreshTokenSecret'), (err, decoded) => {
    if (err) return res.status(401).send(err);

    User.findById(decoded._id).then((user) => {
      if (!user) return res.status(404).send({ message: 'NoUserFound' });

      let dbToken = user.tokens.find(token => token.token === refreshToken);
      if (dbToken) {
        return user.generateAuthTokens('mobile').then((tokens) => {
          res.status(200).json({
            username: decoded.username,
            role: decoded.role,
            ...tokens
          });
        });
      }

      res.status(401).send();
    }).catch(err => res.status(400).send(err));
  });
});

router.post('/logout', (req, res) => {
  let refreshToken = req.header('x-auth-refresh-token');
  User.findByToken(refreshToken).then((user) => {
    if (!user) return res.status(404).send({ message: 'NoUserFound' });

    let tokenIndex = user.tokens.findIndex(token => token.token === refreshToken);
    user.tokens.splice(tokenIndex, 1);
    user.save().then(() => res.status(200).send());
  }).catch((err) => res.status(400).send(err));
});

module.exports = router;
