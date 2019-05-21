const router = require('express').Router();
const authenticate = require('../middleware/auth');
const allowedRoles = require('../middleware/allowedRoles');
const Application = require('../models/Application');
const { STUDENT,  EMPLOYEE } = require('../config/roles');

// @route  POST /apply
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
  }).catch((err) => res.status(400).send(err));
});

module.exports = router;
