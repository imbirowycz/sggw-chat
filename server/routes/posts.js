var express = require('express'),
  router = express.Router(),
  posts = require('../controlers/posts');
  authentication = require('../utilities/authentication')

  
router.get('/getAll',authentication, posts.getAll);

module.exports = router;