const router = require('express').Router(),
      controller = require('../../controllers/labels'),
      auth = require('../auth');

// GET /api/lang/{viewtag}
router.get('/:viewtag', auth.optional, controller.get_labels);
router.get('/', auth.optional, controller.get_labels);

// POST /api/lang/
router.post('/', auth.required, controller.post_labels);

module.exports = router;
