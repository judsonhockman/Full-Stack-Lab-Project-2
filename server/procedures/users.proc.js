var db = require('../config/db');

exports.all = function() {
    return db.rows('GetUsers');
}

exports.read = function(id) {
    return db.row('GetUser', [id]);
}

exports.readByEmail = function(email) {
    return db.row('GetUserByEmail', [email]);
}

exports.create = function(firstName, lastName, email, hash) {
    return db.row('InsertUser', [firstName, lastName, email, hash]);
}