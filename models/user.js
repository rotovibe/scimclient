var db = require('../dbconnection');

var user = {
    getAllUsers: (callback) => {
        return db.query("select firstName, lastName, userName, UserId, ApplicationId   from `Atmosphere`.`User`  ", callback);
    },
    getUserById: (userId, callback) => {
        return db.query("SELECT * from `Atmosphere`.`User` where `UserId` = ? ", [userId], callback);
    },
    insertUser: (usr, callback) => {
        var post = {
            ApplicationId: 11,
            UserName: usr.userName,
            LoweredUserName: usr.userName.toLowerCase(),
            DisplayName: usr.displayName,
            FirstName: usr.name.givenName,
            LastName: usr.name.familyName
        };

        return db.query('INSERT INTO `Atmosphere`.`User` SET ?', post, callback);
    }
};

module.exports = user;