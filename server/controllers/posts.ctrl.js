var express = require('express');
var procedures = require('../procedures/posts.proc');

var router = express.Router();


router.route('/')  // which is actually the route to /api/posts
    .get(function(req, res) {
        procedures.all()
            .then(function(posts) {
                res.send(posts);
            }).catch(function(err) {
                console.log(err)
                res.sendStatus(500);
            });
    })
    .post(function(req, res) {
        // could go with a var here...var r (or whatever) = req.body; and then req.body would be r everywhere in line below
        procedures.create(req.body.title, req.body.content, req.body.userid, req.body.categoryid)
            .then(function(id) {
                res.status(201).send(id);
            }).catch(function(err) {
                console.log(err);
                res.sendStatus(500);
            });
    });


router.route('/:id') // and this one is really routing to /api/posts/id
    .get(function(req, res) {
        procedures.read(req.params.id)
        .then(function(post) {
            res.send(post);
        }).catch(function(err) {
            console.log(err);
            res.sendStatus(500)
        });
    })
    .put(function(req, res) {
        procedures.update(req.params.id, req.body.title, req.body.content, req.body.categoryid)
        .then(function() {
            res.sendStatus(204);
        }).catch(function(err) {
            console.log(err);
            res.sendStatus(500);
        });
    })
    delete(function(req, res) {
        procedures.destroy(req.params.id)
        .then(function() {
            res.sendStatus(204);
        }).catch(function(err) {
            console.log(err);
            res.sendStatus(500);
        });
    });

module.exports = router;


