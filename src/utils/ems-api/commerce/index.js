const BaseApi = require('../BaseApi');
const Customer = require('./Customer');

function Commerce(context) {
    BaseApi.call(this, context);

    this.customer = new Customer(context);
}

Commerce.prototype = Object.create(BaseApi.prototype);
Commerce.prototype.constructor = Commerce;

module.exports = Commerce;
