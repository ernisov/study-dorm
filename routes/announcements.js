const router = require('express').Router();
const { ObjectID } = require('mongodb');
const _ = require('lodash');
const authenticate = require('../middleware/auth');
const allowedRoles = require('../middleware/allowedRoles');
const { ADMIN, COMMANDANT, EMPLOYEE, SERVICE, STUDENT } = require('../config/roles');
const Announcement = require('../models/Announcement');


// @route  POST /announcements/
// @desc   Create new announcement
// @access Admin, Commandant
router.post('/', authenticate, allowedRoles([ADMIN, COMMANDANT]), (req, res) => {
  const { title, description } = req.body;
  const { username } = req.user;
  let announcement = new Announcement({ title, description, author: username });
  announcement.save().then((doc) => {
    res.status(200).json(doc);
  }).catch((error) => res.status(400).send({ message: 'Bad Request', error }));
});

// @route  GET /announcements/
// @desc   Get list of announcements
// @access Admin, Commandant, Student, Employee, Service
router.get(
  '/',
  authenticate,
  allowedRoles([ADMIN, COMMANDANT, STUDENT, EMPLOYEE, SERVICE]),
  (req, res) => {
    const { page, limit } = req.query;
    Announcement.paginate({}, { page, limit: (limit || 10) }).then((result) => {
      res.json({
        list: result.docs,
        hasNextPage: result.hasNextPage,
        hasPrevPage: result.hasPrevPage,
        totalDocs: result.totalDocs,
        totalPages: result.totalPages
      });
    }).catch((error) => {
      console.log(error);
      res.status(400).send({ message: 'Bad Request', error })
    });
  }
);

// @route  GET /announcements/:_id
// @desc   Get an announcements
// @access Admin, Commandant, Student, Employee, Service
router.get(
  '/:_id',
  authenticate,
  allowedRoles([ADMIN, COMMANDANT, STUDENT, EMPLOYEE, SERVICE]),
  (req, res) => {
    let { _id } = req.params;

    if(!ObjectID.isValid(_id)) return res.status(404).send();

    Announcement.findById(_id).then((announcement) => {
      if (!announcement) return res.status(404).send();

      res.json(announcement);
    }).catch((error) => res.status(404).send());
});

// @route  PATCH /announcements/:id
// @desc   Update an announcement
// @access Admin, Commandant
router.patch('/:_id', authenticate, allowedRoles([ADMIN, COMMANDANT]), (req, res) => {
  let { _id }  = req.params;
  let body = _.pick(req.body, ['title', 'description']);

  if (!ObjectID.isValid(_id)) return res.status(404).send();

  Announcement.findByIdAndUpdate(_id,
    { $set: body },
    { new: true }
  ).then((announcement) => {
    if (!announcement) return res.status(404).send();
    res.send(announcement);
  }).catch((error) => res.status(400).send());
});

// @route  DELETE /announcements/:id
// @desc   Delete an announcement
// @access Admin, Commandant
router.delete('/:_id', authenticate, allowedRoles([ADMIN, COMMANDANT]), (req, res) => {
  let { _id } = req.params;

  if(!ObjectID.isValid(_id)) return res.status(404).send();

  Announcement.findByIdAndRemove(_id).then((announcement) => {
    if (!announcement) return res.status(404).send();
    res.send(announcement);
  }).catch((error) => res.status(404).send());
});

module.exports = router;
