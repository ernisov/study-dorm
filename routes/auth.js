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
  let refreshToken = req.header('x-auth-refresh-token');
  jwt.verify(refreshToken, config.get('refreshTokenSecret'), (err, decoded) => {
    if (err) return res.status(401).send(err);

    User.findById(decoded._id).then((user) => {
      if (!user) return res.status(404).send({ message: 'NoUserFound' });

      let dbToken = user.tokens.find(token => token.token === refreshToken);

      if (dbToken && dbToken.token === refreshToken) {
        return user.generateAuthTokens().then((tokens) => {
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
  }).catch((err) => res.status(400).send());
});

module.exports = router;
