const router = require('express').Router();

router.use('/users', require('./users'));
router.use('/news', require('./news'));
router.use('/langs', require('./langs'));
router.use('/labels', require('./labels'));

module.exports = router;
