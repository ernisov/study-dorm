const router = require('express').Router();
const authenticate = require('../middleware/auth');
const allowedRoles = require('../middleware/allowedRoles');
const { ADMIN, COMMANDANT } = require('../config/roles');
const Room = require('../models/Room');
const dormpaths = require('../data/dormpaths');


// @route  GET /rooms/
// @desc   Get all rooms for given dormitory and floor
// @access Admin, Commandant
router.get('/', authenticate, allowedRoles([ADMIN, COMMANDANT]), (req, res) => {
  let { dormitory, floor } = req.query;
  if (dormitory > 1 || floor > 2) return res.status(404).send();
  Room.getRooms(dormitory, floor).then((rooms) => {
    if (!rooms || rooms.length === 0) return res.status(404).send();
    let d = `D${dormitory}`;
    let f = `F${floor}`;
    return res.json({ data: rooms, paths: dormpaths[d][f]});
  }).catch((err) => res.status(400).send(err));
});

// @route POST /rooms/settle
// @desc  Move, settle, unsettle users
// @access Admin, Commandant
router.post('/settle', authenticate, allowedRoles([ADMIN, COMMANDANT]), (req, res) => {
  res.send(req.body);
});

module.exports = router;
