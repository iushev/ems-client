const CRUD = require('../CRUD');

function UserSession(context) {
    CRUD.call(this, context, '/auth/user-session');
}

UserSession.prototype = Object.create(CRUD.prototype);
UserSession.prototype.constructor = UserSession;

module.exports = UserSession;
