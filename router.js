const router = require('express').Router();

router.use('/auth', require('./routes/auth'));
router.use('/users', require('./routes/users'));
router.use('/announcements', require('./routes/announcements'));
router.use('/rooms', require('./routes/rooms'));
router.use('/applications', require('./routes/applications'));
router.use('/tenants', require('./routes/tenants'));
router.use('/settlements', require('./routes/settlements'));
router.use('/requests', require('./routes/requests'));
router.use('/api', require('./routes/api'));
router.use('/dormitory', require('./routes/dormitory'));
router.use('/docs', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'swagger.yaml'));
});

module.exports = router;
