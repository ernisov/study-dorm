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

  Tenant.findOne({ username: req.body.tenant }).then((tenant) => {
    if (!tenant) return res.status(404).send({ message: 'tenant not found' });

    switch (req.body.action) {
      case ACTIONS.SETTLE:
        let to = req.body.to;

        Room.findOne({ id: to }).then((room) => {
          if (!room) return res.status(404).send({ message: 'room not found' });
          if (!room.hasTenant(tenant.username) && !tenant.room) {
            room.addTenant(tenant);
            tenant.room = to;
            tenant.settlementStatus = 'settled';

            return Promise.all([room.save(), tenant.save()]).then(() => {
              return res.status(200).send({ message: 'OK' });
            });
          }
          return res.status(400).send({ message: 'not proper action' });
        }).catch((err) => {
          console.log(err);
          return res.status(400).send({ error: err });
        });

        break;

      case ACTIONS.UNSETTLE:
        let from = req.body.from;
        Room.findOne({ id: from }).then((room) => {
          if (!room) return res.status(404).send({ message: 'room not found' });
          if (room.hasTenant(tenant.username) && tenant.room === from) {
            room.removeTenant(tenant.username);
            tenant.room = undefined;
            tenant.settlementStatus = 'not_settled';
            return Promise.all([room.save(), tenant.save()]).then(() => {
              return res.status(200).send({ message: 'OK' });
            });
          }

          return res.status(400).send({ message: 'error' })
        }).catch(error => {
          console.log(error);
          return res.status(400).send({ error });
        });

        break;

      case ACTIONS.MOVE:


        break;

      default:
        res.status(400).send({ message: 'action invalid' });
    }
  });
});

module.exports = router;
