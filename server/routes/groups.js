var express = require('express'),
  router = express.Router(),
  groups = require('../controlers/groups'),
  authentication = require('../utilities/authentication')

  
router.get('/getAll',authentication, groups.getAll);

module.exports = router;