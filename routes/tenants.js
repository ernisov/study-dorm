const router = require('express').Router();
const Tenant = require('../models/Tenant');
const authenticate = require('../middleware/auth');
const allowedRoles = require('../middleware/allowedRoles');
const { ADMIN, COMMANDANT } = require('../config/roles');

router.get('/', authenticate, allowedRoles([ADMIN, COMMANDANT]), (req, res) => {
  let { settlementStatus, page, limit } = req.query;
  let config = {
    page: (page || 1),
    limit: (limit || 10)
  };
  let query = { settlementStatus };
  if (!settlementStatus || settlementStatus === 'all') {
    query = {
      settlementStatus: {
        $not: /not_applied/
      }
    };
  }

  Tenant.paginate(query, config).then((result) => {
    res.status(200).json({
      totalDocs: result.totalDocs,
      totalPages: result.totalPages,
      list: result.docs,
      hasNextPage: result.hasNextPage,
      hasPrevPage: result.hasPrevPage
    });
  }).catch((err) => {
    res.status(400).send({ error: err });
  });
});

module.exports = router;
