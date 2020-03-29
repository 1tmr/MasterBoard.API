const router = require('express').Router(),
      controller = require('../../controllers/news'),
      auth = require('../auth');

// GET /api/news/
router.get('/', auth.optional, controller.get_news);
// GET /api/news/{count}
router.get('/:count', auth.optional, controller.get_newsByCount);
// POST /api/news/
router.post('/', auth.required, controller.post_news);

module.exports = router;
