const router = require('express').Router();
const Tenant = require('../models/Tenant');
const authenticate = require('../middleware/auth');
const allowedRoles = require('../middleware/allowedRoles');
const { ADMIN, COMMANDANT } = require('../config/roles');

router.get('/', authenticate, allowedRoles([ADMIN, COMMANDANT]), (req, res) => {
  let { settlementStatus, page, limit } = req.query;
  
});
