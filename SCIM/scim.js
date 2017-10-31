var scim = {
    formatResponse: (id, data, temp) => {
        var tmp = temp;
        tmp.name.formatted = data.name.formatted;
        tmp.name.familyName = data.name.familyName;
        tmp.name.givenName = data.name.givenName;
        tmp.nickName = data.nickName;
        tmp.userType = data.name.userType;
        tmp.externalId = data.externalId;
        tmp.id = data.id;
        tmp.userName = data.userName;
        tmp['urn:scim:schemas:extension:enterprise:1.0'].length = 0;
        tmp['urn:scim:schemas:extension:enterprise:1.0'] = data['urn:scim:schemas:extension:enterprise:1.0'];
        tmp['urn:scim:schemas:extension:custom:1.0'] = { role: data['urn:scim:schemas:extension:custom:1.0']['role'], "appUserId": id };

        // emails
        var email = {
            value: data.emails[0].value,
            type: data.emails[0].type,
            primary: data.emails[0].primary,
        };
        tmp.emails.length = 0;
        tmp.emails.push(email);
        tmp.emails.type = data.emails.type;
        tmp.emails.primary = data.emails.primary;

        tmp.displayName = data.displayName;
        tmp.meta.created = new Date();
        tmp.meta.lastModified = new Date();
        return temp;
    }
};

module.exports = scim;