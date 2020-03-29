const router = require('express').Router(),
      controller = require('../../../controllers/users'),
      auth = require('../../auth');

// POST /api/users/
router.post('/', auth.optional, controller.get_index);
// POST /api/users/login
router.post('/login', auth.optional, controller.post_login);
//GET /api/users/data
router.get('/data/', auth.required, controller.get_data);
//GET /api/users/data/{uid}
router.get('/data/:uid', auth.required, controller.get_dataByUID);

module.exports = router;
