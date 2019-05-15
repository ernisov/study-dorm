const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const authenticate = require('../middleware/auth');
const allowedRoles = require('../middleware/allowedRoles');

router.get('/', authenticate, allowedRoles(['student', 'admin']), (req, res) => {
  res.send(req.user.role);
});


module.exports = router;
