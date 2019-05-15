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

// router.patch('/:username')

// router.delete('/:username')

module.exports = router;
