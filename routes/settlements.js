const router = require('express').Router();
const Settlement = require('../models/Settlement');
const Room = require('../models/Room');
const Tenant = require('../models/Tenant');
const authenticate = require('../middleware/auth');
const allowedRoles = require('../middleware/allowedRoles');
const { ADMIN, COMMANDANT } = require('../config/roles');

const ACTIONS = {
  MOVE: 'move',
  SETTLE: 'settle',
  UNSETTLE: 'unsettle'
};

router.post('/', authenticate, allowedRoles([ADMIN, COMMANDANT]), (req, res) => {
  if (!req.body.tenant) {
    return res.status(400).send({ message: 'no tenant specified' });
  } else if (!req.body.action) {
    return res.status(400).send({ message: 'no action specified' });
  }

  let to = req.body.to;
  let from = req.body.from;

  Tenant.findOne({ username: req.body.tenant }).then((tenant) => {
    if (!tenant) return res.status(404).send({ message: 'tenant not found' });

    switch (req.body.action) {
      case ACTIONS.SETTLE:
        Room.findOne({ id: to }).then((room) => {
          if (!room) return res.status(404).send({ message: 'room not found' });
          if (!room.hasTenant(tenant.username) && !tenant.room) {
            room.addTenant(tenant);
            if (room.tenants.length >= room.maxTenants) {
              room.available = false;
            }
            tenant.room = to;
            tenant.settlementStatus = 'settled';

            return Promise.all([room.save(), tenant.save()])
              .then(() => {
                let settlement = new Settlement({
                  to,
                  by: req.user.username,
                  action: ACTIONS.SETTLE,
                  username: tenant.username
                });
                return settlement.save();
              })
              .then(() => res.status(200).send({ message: 'OK' }));
          }
          return res.status(400).send({ message: 'not proper action' });
        }).catch((err) => {
          console.log(err);
          return res.status(400).send({ error: err });
        });

        break;

      case ACTIONS.UNSETTLE:
        Room.findOne({ id: from }).then((room) => {
          if (!room) return res.status(404).send({ message: 'room not found' });
          if (room.hasTenant(tenant.username) && tenant.room === from) {
            room.removeTenant(tenant.username);
            if (room.tenants.length < room.maxTenants) {
              room.available = true;
            }
            tenant.room = undefined;
            tenant.settlementStatus = 'not_settled';
            return Promise.all([room.save(), tenant.save()])
              .then(() => {
                let settlement = new Settlement({
                  username: tenant.username,
                  by: req.user.username,
                  action: ACTIONS.UNSETTLE,
                  from
                });
                return settlement.save();
              })
              .then(() => res.status(200).send({ message: 'OK' }));
          }

          return res.status(400).send({ message: 'error' })
        }).catch(error => {
          console.log(error);
          return res.status(400).send({ error });
        });

        break;

      case ACTIONS.MOVE:
        Room.findOne({ id: from })
        .then((room) => {
          if (!room) return res.status(404).send({ message: 'room not found' });
          if (room.hasTenant(tenant.username) && tenant.room === from) {
            room.removeTenant(tenant.username);
            if (room.tenants.length < room.maxTenants) {
              room.available = true;
            }
            return room.save();
          }
          return Promise.reject();
        })
        .then(() => Room.findOne({ id: to }))
        .then((room) => {
          if (!room) return res.status(404).send({ message: 'room not found' });
          room.addTenant(tenant);
          if (room.tenants.length >= room.maxTenants) {
            room.available = false;
          }
          tenant.room = room.id;
          return Promise.all([room.save(), tenant.save()])
        })
        .then(() => {
          let settlement = new Settlement({
            to,
            from,
            by: req.user.username,
            username: tenant.username,
            action: ACTIONS.MOVE
          });
          return settlement.save();
        })
        .then(() => res.status(200).send({ message: 'OK' }))
        .catch((err) => res.status(400).send({ error: err }));

        break;

      default:
        res.status(400).send({ message: 'action invalid' });
    }
  });
});

module.exports = router;
