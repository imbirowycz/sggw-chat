var express = require('express'),
  router = express.Router(),
  auth = require('../controlers/auth');
  authentication = require('../utilities/authentication')

  
router.post('/login', auth.login);
router.post('/logout', auth.logout);
router.post('/init',authentication, auth.init)



module.exports = router;
