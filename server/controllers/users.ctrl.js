var express = require('express');
var passport = require('passport');
var procedures = require('../procedures/users.proc');
var auth = require('../middleware/auth.mw');
var utils = require('../utils');

var router = express.Router();
router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        if (!user) {
            return res.status(401).send(info);
        }
        req.logIn(user, function(err) {
            if (err) {
                return res.sendStatus(500);
            } else {
                return res.send(user);
            }
        });
    })(req, res, next);
});

router.all('*', auth.isLoggedIn);

router.get('/logout', function(req, res) {
    req.session.destroy(function() {
        req.logOut();
        res.sendStatus(204);
    });
});

router.get('/me', function(req, res) {
    res.send(req.user);
});

// actually /api/users/
router.route('/')
    .get(function(req, res) {
        procedures.all()
        .then(function(users) {
            res.send(users);
        }).catch(function(err) {
            console.log(err);
            res.sendStatus(500);
        });
    })
    .post(auth.isAdmin, function(req, res) {
        utils.encryptPassword(req.body.password)
        .then(function(hash) {
            return procedures.create(req.body.firstname, req.body.lastname, req.body.email, hash)
        }).then(function(id) {
            res.status(201).send(id);
        }).catch(function(err) {
            console.log(err);
            res.sendStatus(500);
        });
    });
module.exports = router;