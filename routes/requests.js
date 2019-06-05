const router = require('express').Router();
const Request = require('../models/Request');
const Tenant = require('../models/Tenant');
const User = require('../models/User');
const Room = require('../models/Room');
const authenticate = require('../middleware/auth');
const allowedRoles = require('../middleware/allowedRoles');
const { ADMIN, COMMANDANT, SERVICE, EMPLOYEE, STUDENT } = require('../config/roles');

router.post('/', authenticate, allowedRoles([ADMIN, EMPLOYEE, STUDENT, COMMANDANT]), (req, res) => {
  
});

module.exports = router;
