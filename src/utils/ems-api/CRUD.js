const BaseApi = require("./BaseApi");

function CRUD(context, baseUrl) {
    BaseApi.call(this, context);

    this.baseUrl = baseUrl;
}

CRUD.prototype = Object.create(BaseApi.prototype);
CRUD.prototype.constructor = CRUD;

CRUD.prototype.create = function(data, q = {}) {
    return this.context.axios
        .post(this.baseUrl, data, {
            params: {
                q: JSON.stringify(q),
            },
        })
        .then(function(response) {
            return response.data;
        });
};

CRUD.prototype.get = function(id, q = {}) {
    return this.context.axios
        .get(`${this.baseUrl}/${id}`, {
            params: {
                q: JSON.stringify(q),
            },
        })
        .then(function(response) {
            return response.data;
        });
};

CRUD.prototype.update = function(id, data) {
    return this.context.axios.put(`${this.baseUrl}/${id}`, data).then(function(response) {
        return response.data;
    });
};

CRUD.prototype.delete = function(id) {
    return this.context.axios.delete(`${this.baseUrl}/${id}`).then(function(response) {
        return response.data;
    });
};

CRUD.prototype.list = function(config) {
    return this.context.axios.get(this.baseUrl, config).then(function(response) {
        return response.data;
    });
};

module.exports = CRUD;
