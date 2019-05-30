const router = require('express').Router();
const authenticate = require('../middleware/auth');
const allowedRoles = require('../middleware/allowedRoles');
const Application = require('../models/Application');
const Tenant = require('../models/Tenant');
const { STUDENT,  EMPLOYEE, DEAN, ADMIN } = require('../config/roles');

// @route  POST /applications
// @desc   Create user application
// @access Student, Employee
router.post('/', authenticate, allowedRoles([STUDENT, EMPLOYEE]), (req, res) => {
  const { username, firstName, lastName } = req.user;
  let { birthDate, issuedDate, issuedBy, passportNumber } = req.body;

  Tenant.findOne({ username }).then((tenant) => {
    if (!tenant) return res.status(404).send({ message: 'UserNotFound' });

    if (tenant.settlementStatus !== 'not_applied') {
      return res.status(304).send({ message: 'user already approved' });
    }

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

  }).catch((error) => res.status(400).send({ message: 'Bad Request', error }));
});

// @route  GET /applications
// @desc   Get applications
// @access Dean, Admin
router.get('/', authenticate, allowedRoles([DEAN, ADMIN]), (req, res) => {
  const { page, limit, username, status } = req.query;
  let options = {status};
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

// @route  POST /applications/:_id
// @desc   Modify application
// @access Dean, Admin
router.post('/:_id', authenticate, allowedRoles([DEAN, ADMIN]), (req, res) => {
  let { _id } =  req.params;
  let { status } = req.body;

  Application.findByIdAndUpdate(_id, { status }).then((result) => {
    if (!result) return res.status(404).send();
    if (status === 'approved') {
      return Tenant.findOneAndUpdate({
        username: result._user
      }, { settlementStatus: 'not_settled' }).then((tenant) => {
        if (!tenant) return res.status(400).send({ message: 'UserNotFound' });
        res.status(200).send({
          application: { _id, status },
          tenant
        });
      }).catch(err => res.status(400).send(err));
    }
    res.status(200).send({ application: result });
  }).catch((error) => res.status(400).send(error));
});

module.exports = router;
