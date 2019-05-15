const jwt = require('jsonwebtoken');
const config = require('config');

const allowedRoles = (roles) => {
  return (req, res, next) => {
    if (roles.includes(req.user.role)) {
      return next();
    }
    res.status(403).send();
  };
};

module.exports = allowedRoles;
