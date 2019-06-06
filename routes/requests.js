const router = require('express').Router();
const Request = require('../models/Request');
const Tenant = require('../models/Tenant');
const User = require('../models/User');
const Room = require('../models/Room');
const authenticate = require('../middleware/auth');
const allowedRoles = require('../middleware/allowedRoles');
const { ADMIN, COMMANDANT, SERVICE, EMPLOYEE, STUDENT } = require('../config/roles');

router.post('/', authenticate, allowedRoles([ADMIN, EMPLOYEE, STUDENT]), (req, res) => {
  let { title, description, category } = req.body;
  Tenant.findOne({ username: req.user.username })
    .then((tenant) => {
      if (!tenant) return res.status(404).send({ message: 'Tenant not found' });
      if (!tenant.room) return res.status(403).send({ message: 'Tenant not settled' });

      let request = new Request({
        title: title,
        description: description,
        category: category,
        author: req.user.username,
        room: tenant.room
      });

      return request.save().then((result) => {
        return res.status(200).send({ message: 'OK', request: result });
      });
    })
    .catch((error) => res.status(400).send({ message: 'Bad Request' }));
});

router.get('/', authenticate, allowedRoles([ADMIN, EMPLOYEE, STUDENT, COMMANDANT, SERVICE]), (req, res) => {
  let { status, page, limit } = req.query;
  let options = {};
  if (status) options.status = status;

  Request.paginate(options, { page, limit })
    .then((result) => {
      res.json({
        list: result.docs,
        hasNextPage: result.hasNextPage,
        hasPrevPage: result.hasPrevPage,
        totalDocs: result.totalDocs,
        totalPages: result.totalPages
      });
    }).catch((error) => res.status(400).send({ message: 'Bad Request' }));
});

module.exports = router;
