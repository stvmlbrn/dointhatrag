var appRoot = require('app-root-path');
var express = require('express');
var router = express.Router();
var SetList = require(appRoot + '/server/models/setList');

router.post('/search', (req, res, next) => {
  SetList.search(req.body.criteria)
    .then(results => res.json(results));
});

router.get('/', (req, res, next) => res.render('index'));


module.exports = router;
