const CRUD = require('../CRUD');

function Customer(context) {
    CRUD.call(this, context, '/commerce/customer');
}

Customer.prototype = Object.create(CRUD.prototype);
Customer.prototype.constructor = Customer;

module.exports = Customer;