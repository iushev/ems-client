const CRUD = require('../CRUD');

function Role(context) {
    CRUD.call(this, context, '/auth/role');
}

Role.prototype = Object.create(CRUD.prototype);
Role.prototype.constructor = Role;

module.exports = Role;
