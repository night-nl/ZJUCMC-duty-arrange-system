var express = require('express');
var router = express.Router();
const controller = require("../controller/index");
const userController = require("../controller/user");


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
