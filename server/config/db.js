var mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: 'process.env.DB_USER',
    password: 'process.env.DB_PASSWOERD',
    database: 'AngularBlog'
});
exports.pool = pool;

exports.rows = function rows(procedureName, args) {
    return callProcedure(procedureName, args)
        .then(function (resultsets) {
            return resultsets[0];
        });
}

exports.row = function row(procedureName, args) {
    return callProcedure(procedureName, args)
        .then(function(resultsets) {
            return resultsets[0][0];
        });
}

exports.empty = function empty(procedureName, args) {
    return callProcedure(procedureName, args)
        .then(function() {
            return;
        });
}

function callProcedure(procedureName, args) {
    return new Promise(function(resolve, reject) { // Called executof
        pool.getConnection(function(err, connection) {  // call-back...error is first parameter. Success is second.
            if (err) {
                reject(err);
            } else {
                var placeholders = '';
                if (args && args.length > 0) {
                    for (var i = 0; i < args.length; i++) {
                        if (i === args.length - 1) {
                            placeholders += '?';
                        } else {
                            placeholders += '?,';
                        }
                    }
                }
                var callString = 'CALL ' + procedureName + '(' + placeholders + ');';
                connection.query(callString, args, function(err, resultsets) {
                    connection.release();
                    if (err) {
                        reject(err);
                    } else {
                        resolve(resultsets);
                    }
                });
            }
        });
    });
}

