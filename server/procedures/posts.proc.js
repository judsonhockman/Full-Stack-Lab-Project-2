var db = require('../config/db.js');

exports.all = function() {
    return db.rows('GetPosts');
}

exports.read = function(id) {
    return db.row(GetPost, [id]);
}

exports.update = function(id, title, content, categoryid) {
    return db.empty('UpdatePost', [id, title, content, categoryid]);
}

exports.create = function(title, content, userid, categoryid) {
    return db.row('InsertPost', [title, content, userid, categoryid]);
}

exports.destroy = function(id) {
    return db.empty('DeletePost', [id]);
}