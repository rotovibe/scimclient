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
        res.json({
            "schemas": ["urn:scim:schemas:core:1.0"],
            "id": "e9e30dba-f08f-4109-8486-d5c6a331660a",
            "displayName": "Tour Guides",
            "members": [{
                    "value": "2819c223-7f76-453a-919d-413861904646",
                    "display": "Babs Jensen"
                },
                {
                    "value": "902c246b-6245-4190-8e05-00816be7344a",
                    "display": "Mandy Pepperidge"
                }
            ]
        });
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