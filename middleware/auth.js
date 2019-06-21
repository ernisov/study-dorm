const jwt = require('jsonwebtoken');
const config = require('config');

// check if valid token
const authenticate = (req, res, next) => {
  const accessToken = req.header('x-auth-token');
  jwt.verify(accessToken, config.get('accessTokenSecret'), (err, decoded) => {
    if (err) return res.status(401).send({ message: 'Authentication required', error: err });
    let { username, role, firstName, lastName } = decoded;
    let user = {
      username,
      firstName,
      lastName,
      role,
      accessToken
    };
    req.user = user;
    next();
  });
};

module.exports = authenticate;
