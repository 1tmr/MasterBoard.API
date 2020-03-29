const router = require('express').Router(),
      controller = require('../../../controllers/users'),
      auth = require('../../auth');

// POST /api/users/
router.post('/', auth.optional, controller.get_index);

router.use('/login', require('./login'));
router.use('/data', require('./details'));

module.exports = router;
