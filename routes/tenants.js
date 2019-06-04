const router = require('express').Router();
const Tenant = require('../models/Tenant');
const User = require('../models/User');
const Room = require('../models/Room');
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

router.get('/:username', authenticate, allowedRoles([ADMIN, COMMANDANT]), (req, res) => {
  let { username } = req.params;
  Tenant.findOne({ username }).then((tenant) => {
    if (!tenant) return res.status(404).send({ message: 'TenantNotFound' });
    User.findOne({ username }).then((user) => {
      if (!user) return res.status(404).send({ message: 'TenantNotFound' });

      Room.findOne({ id: tenant.room }).then((room) => {
        let roomDetails = {};
        if (room) {
          roomDetails = {
            dormitory: room.dormitory,
            floor: room.floor,
            number: room.number
          };
        }

        return res.send({
          room: roomDetails,
          tenant: {
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            settlementStatus: tenant.settlementStatus
          }
        });
      });
    });
  }).catch((err) => res.status(400).send({ error: err }));
});

module.exports = router;
