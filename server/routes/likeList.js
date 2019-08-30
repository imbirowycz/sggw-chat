var express = require('express'),
  router = express.Router(),
  likeList = require('../controlers/likeList'),
  authentication = require('../utilities/authentication')

  
router.get('/getAll',authentication, likeList.getAll);

module.exports = router;