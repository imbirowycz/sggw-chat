var express = require('express'),
  router = express.Router(),
  favoriteList = require('../controlers/favoriteList'),
  authentication = require('../utilities/authentication')

  
router.get('/getAll',authentication, favoriteList.getAll);

module.exports = router;