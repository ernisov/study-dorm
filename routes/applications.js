const router = require('express').Router();
const authenticate = require('../middleware/auth');
const allowedRoles = require('../middleware/allowedRoles');
const Application = require('../models/Application');
const { STUDENT,  EMPLOYEE, DEAN, ADMIN } = require('../config/roles');

// @route  POST /applications
// @desc   Create user application
// @access Student, Employee
router.post('/', authenticate, allowedRoles([STUDENT, EMPLOYEE]), (req, res) => {
  const { username, firstName, lastName } = req.user;
  let { birthDate, issuedDate, issuedBy, passportNumber } = req.body;
  let application = new Application({
    _user: username,
    firstName: firstName,
    lastName: lastName,
    birthDate: birthDate,
    passportNumber: passportNumber,
    passportMKK: issuedBy,
    passportDate: issuedDate
  });

  application.save().then((doc) => {
    res.json(doc);
  }).catch((error) => res.status(400).send({ message: 'Bad Request', error}));
});

// @route  GET /apply
// @desc   Get applications
// @access Dean, Admin
router.get('/', authenticate, allowedRoles([DEAN, ADMIN]), (req, res) => {
  const { page, limit, username } = req.query;
  let options = {};
  if (username) options._user = username;
  Application.paginate(options, { page, limit: (limit || 10) })
    .then((result) => {
      res.json({
        list: result.docs,
        hasNextPage: result.hasNextPage,
        hasPrevPage: result.hasPrevPage,
        totalDocs: result.totalDocs,
        totalPages: result.totalPages
      });
    }).catch((error) => {
      console.log(error);
      res.status(400).send({ message: 'Bad Request', error });
    })
});

module.exports = router;