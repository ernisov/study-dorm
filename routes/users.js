const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const authenticate = require('../middleware/auth');
const allowedRoles = require('../middleware/allowedRoles');

const User = require('../models/User');

router.get('/', authenticate, allowedRoles(['admin']), (req, res) => {
  // TODO: find about pagination
  User.find().then((users) => {
    res.json(users);
  }).catch(err => console.log(err));
});

router.post('/', authenticate, allowedRoles(['admin']), (req, res) => {
  let { username, password, role } = req.body;
  let user = new User({ username, password, role });
  user.save().then((doc) => {
    res.status(200).json({
      username: doc.username,
      role: doc.role
    });
  }).catch((err) => res.status(400).send(err));
});

router.get('/:username', authenticate, allowedRoles(['admin']), (req, res) => {
  let { username } = req.params;
  User.findOne({ username }).then((user) => {
    if (!user) return res.status(404).send();

    res.status(200).json({
      username: user.username,
      role: user.role
    });
  }).catch((err) => res.status(400).send(err));
});

router.patch('/:username', authenticate, allowedRoles(['admin']), (req, res) => {
  let { username } = req.params;
  let update = {};
  for (let key in req.body) {
    update[key] = req.body[key];
  }

  User.findOne({ username }).then((user) => {
    if (!user) return res.status(404).send();
    for (let key in update) {
      user[key] = update[key];
    }
    user.save().then((result) => res.send(result));
  }).catch((err) => res.status(400).send(err));
});

router.delete('/:username', authenticate, allowedRoles(['admin']), (req, res) => {
  let { username } = req.params;
  User.findOneAndRemove({ username }).then((result) => {
    if (!result) return res.status(404).send();
    res.status(200).send({
      username: result.username,
      role: result.role
    });
  }).catch((err) => res.status(400).send(err));
});

module.exports = router;