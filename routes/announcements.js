const router = require('express').Router();
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


module.exports = router;
