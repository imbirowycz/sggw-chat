var express = require('express'),
  router = express.Router(),
  auth = require('../controlers/auth');


router.post('/login', auth.login);
router.post('/logout', auth.logout);

module.exports = router;
