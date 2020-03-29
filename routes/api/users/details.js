const router = require('express').Router(),
      controller = require('../../../controllers/users'),
      auth = require('../../auth');

//GET /api/users/data
router.get('/', auth.required, controller.get_data);
//GET /api/users/data/{uid}
router.get('/:uid', auth.required, controller.get_dataByUID);

module.exports = router;
