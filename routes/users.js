var express = require('express');
var router = express.Router();
var usr = require('../models/user');
var responseJson = require('../SCIM/response');
var SCIM = require('../SCIM/scim');

/* GET users listing. */
router.get('/:userId?', (req, res, next) => {
    if (req.params.userId) {
        usr.getUserById(req.params.userId, (err, rows) => {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    } else {
        usr.getAllUsers((err, rows) => {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    }
});

router.post('/', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    console.log('request body' + JSON.stringify(req.body.userName));

    usr.insertUser(req.body, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            var payload = SCIM.formatResponse(result.insertId, req.body, responseJson);
            res.statusCode = 201;
            res.set('Location', req.get('host') + req.baseUrl + '/' + result.insertId);
            res.json(payload);
        }
    });
})

module.exports = router;