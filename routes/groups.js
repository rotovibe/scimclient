var express = require('express');
var router = express.Router();
var grp = require('../models/group');
var responseJson = require('../SCIM/response');
var SCIM = require('../SCIM/scim');

/* GET users listing. */
router.get('/:groupId?', (req, res, next) => {
    if (req.params.groupId) {
        res.json({ groups: 'testing with groupid!' });
        /*  grp.getGroupById(req.params.userId, (err, rows) => {
             if (err) {
                 res.json(err);
             } else {
                 res.json(rows);
             }
         }); */
    } else {
        res.json({ groups: 'testing!' });
        /*         grp.getAllGroups((err, rows) => {
                    if (err) {
                        res.json(err);
                    } else {
                        //res.json(rows);
                        res.body({ groups: 'testing!' });
                    }
                }); */
    }
});

router.post('/', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    console.log('request body' + JSON.stringify(req.body.userName));

    grp.insertGroup(req.body, (err, result) => {
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