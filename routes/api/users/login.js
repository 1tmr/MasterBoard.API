const router = require('express').Router(),
      controller = require('../../../controllers/users'),
      auth = require('../../auth');

// POST /api/users/login
router.post('/', auth.optional, controller.post_login);

module.exports = router;
