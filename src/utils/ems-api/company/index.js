const BaseApi = require('../BaseApi');
const Employee = require('./Employee');

function Company(context) {
    BaseApi.call(this, context);

    this.employee = new Employee(context);
}

Company.prototype = Object.create(BaseApi.prototype);
Company.prototype.constructor = Company;

module.exports = Company;
