const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const authenticate = require('../middleware/auth');
const allowedRoles = require('../middleware/allowedRoles');

const User = require('../models/User');
const Tenant  = require('../models/Tenant');
const {
  ADMIN,
  STUDENT,
  EMPLOYEE,
  DEAN,
  SERVICE,
  COMMANDANT
} = require('../config/roles');

router.get('/', authenticate, allowedRoles([ADMIN]), (req, res) => {
  User.paginate({}, { limit: req.query.limit, page: req.query.page }).then((result) => {
    let docs = result.docs.map(user => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role
    }));

    res.json({
      users: docs,
      hasNextPage: result.hasNextPage,
      hasPrevPage: result.hasNextPage,
      totalDocs: result.totalDocs,
      totalPages: result.totalPages
    });
  }).catch(err => console.log(err));
});

router.post('/', authenticate, allowedRoles([ADMIN]), (req, res) => {
  let { username, password, role, firstName, lastName } = req.body;
  let user = new User({ username, password, role, firstName, lastName });
  user.save().then((doc) => {
    let sendUser = () => {
      res.status(200).json({
        username: doc.username,
        firstName: doc.firstName,
        lastName: doc.lastName,
        role: doc.role
      });
    };
    if ([STUDENT, EMPLOYEE, COMMANDANT, SERVICE].includes(role)) {
      const tenant = new Tenant({ _user: username });
      return tenant.save()
        .then((t) => sendUser())
        .catch(err => Promise.reject(err));
    } else {
      console.log('Not a tenant');
      return sendUser();
    }
  }).catch((err) => {
    console.log(err);
    res.status(400).send(err)
  });
});

router.get('/:username', authenticate, allowedRoles([ADMIN]), (req, res) => {
  let { username } = req.params;
  User.findOne({ username }).then((user) => {
    if (!user) return res.status(404).send();

    res.status(200).json({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role
    });
  }).catch((err) => res.status(400).send(err));
});

router.patch('/:username', authenticate, allowedRoles([ADMIN]), (req, res) => {
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

router.delete('/:username', authenticate, allowedRoles([ADMIN]), (req, res) => {
  let { username } = req.params;
  User.findOneAndRemove({ username }).then((result) => {
    if (!result) return res.status(404).send();
    res.status(200).send({
      username: result.username,
      firstName: result.firstName,
      lastName: result.lastName,
      role: result.role
    });
  }).catch((err) => res.status(400).send(err));
});

module.exports = router;
