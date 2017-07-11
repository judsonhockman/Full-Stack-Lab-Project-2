var express = require('express');
var procedures = require('../procedures/categories.proc');

var router = express.Router();


router.route('/') // like the others, this is actually /api/categories/
    .get(function(req, res) {
        procedures.all()
        .then(function(categories) {
            res.send(categories);
        }).catch(function(err) {
            console.log(err);
            res.sendStatus(500);
        });
    });
    
module.exports = router;