const router = require('express').Router();
const Room = require('../models/Room');
const authenticate = require('../middleware/auth');
const allowedRoles = require('../middleware/allowedRoles');
const { ADMIN, COMMANDANT } = require('../config/roles');

router.get('/', authenticate, allowedRoles([ADMIN, COMMANDANT]), (req, res) => {
  Room.getDetails().then(doc => {
    res.json(doc);
  });
});

module.exports = router;
