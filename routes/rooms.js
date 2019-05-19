const router = require('express').Router();
const authenticate = require('../middleware/auth');
const allowedRoles = require('../middleware/allowedRoles');
const { ADMIN, COMMANDANT } = require('../config/roles');
const Room = require('../models/Room');
const D1F1 = require('../data/D1F1.json');
const D1F2 = require('../data/D1F2.json');


// @route  GET /rooms/
// @desc   Get all rooms for given dormitory and floor
// @access Admin, Commandant
router.get('/', authenticate, allowedRoles([ADMIN, COMMANDANT]), (req, res) => {
  let { dormitory, floor } = req.query;
  if (dormitory > 1 || floor > 2) return res.status(404).send();
  if (floor == 1) {
    Room.getRooms(dormitory, floor).then((rooms) => {
      if (!rooms || rooms.length === 0) return res.status(404).send();
      return res.json({ data: rooms, paths: D1F1});
    }).catch((err) => res.status(400).send(err));
  }
  if (floor == 2) {
    Room.getRooms(dormitory, floor).then((rooms) => {
      if (!rooms || rooms.length === 0) return res.status(404).send();
      return res.json({ data: rooms, paths: D1F2});
    }).catch((err) => res.status(400).send(err));
  }
});

module.exports = router;
