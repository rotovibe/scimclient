var db = require('./config');
var mysql = require('mysql');

var connection = mysql.createPool({
    host: db.sql.host, //'165.227.109.102',
    user: db.sql.user,
    password: db.sql.password,
    database: db.sql.database,
    multipleStatements: true
});
module.exports = connection;