const CRUD = require('../CRUD');

function Employee(context) {
    CRUD.call(this, context, '/company/employee');
}

Employee.prototype = Object.create(CRUD.prototype);
Employee.prototype.constructor = Employee;

Employee.prototype.createAccount = function(id, data, q = {}) {
    return this.context.axios
        .post(`${this.baseUrl}/${id}/create-account`, data, {
            params: {
                q: JSON.stringify(q),
            },
        })
        .then(function(response) {
            return response.data;
        });
}

Employee.prototype.updateAccount = function(id, data, q = {}) {
    return this.context.axios
        .put(`${this.baseUrl}/${id}/update-account`, data, {
            params: {
                q: JSON.stringify(q),
            },
        })
        .then(function(response) {
            return response.data;
        });
}

Employee.prototype.findOne = function(q = {}) {
    const _q = Object.assign({}, q, { limit: 1 })
    return this.context.axios
        .get(`${this.baseUrl}`, {
            params: {
                q: JSON.stringify(_q),
            },
        })
        .then(function(response) {
            return response.data.results[0] || null;
        });
}

module.exports = Employee;