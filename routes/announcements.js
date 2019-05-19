const router = require('express').Router();
const authenticate = require('../middleware/auth');
const allowedRoles = require('../middleware/allowedRoles');
const { ADMIN, COMMANDANT } = require('../config/roles');
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


module.exports = router;
