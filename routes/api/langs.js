const router = require('express').Router(),
      controller = require('../../controllers/langs'),
      auth = require('../auth');

// GET /api/lang/
router.get('/', auth.optional, controller.get_langs);
// POST /api/lang/
router.post('/', auth.required, controller.post_lang);

module.exports = router;
