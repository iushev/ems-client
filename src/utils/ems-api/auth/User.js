const CRUD = require('../CRUD');

function User(context) {
    CRUD.call(this, context, '/auth/user');
}

User.prototype = Object.create(CRUD.prototype);
User.prototype.constructor = User;

module.exports = User;
