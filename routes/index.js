var express = require('express');
var router = express.Router();
var usr = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
    usr.getAllUsers((err, rows) => {
        if (err) {
            res.json(err);
        } else {
            res.render('index', { title: 'Target Application 1', rows: rows });
        }
    });

});

module.exports = router;