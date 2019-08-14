const BaseApi = require('../BaseApi');
const User = require('./User');
const Role = require('./Role');

function Auth(context) {
    BaseApi.call(this, context);

    this.user = new User(context);
    this.role = new Role(context);
}

Auth.prototype = Object.create(BaseApi.prototype);
Auth.prototype.constructor = Auth;

Auth.prototype.sign_up = function(data) {
    return this.context.axios.post('/auth/sign-up', data)
        .then(function(response) {
            return response.data;
        });
};

Auth.prototype.sign_in = function(username, password) {
    return this.context.axios.post('/auth/sign-in', {
        username,
        password,
    }).then(function(response) {
        return response.data;
    });
};

Auth.prototype.sign_out = function() {
    return this.context.axios.get('/auth/sign-out')
        .then(function(response) {
            return response.data;
        });
};

Auth.prototype.reset_password = function(email) {
    return this.context.axios.post('/auth/reset-password', {
        email
    }).then(function(response) {
        return response.data;
    });
};

Auth.prototype.change_password = function(password, new_password, new_password_confirm) {
    return this.context.axios.post('/auth/change-password', {
        password: password,
        new_password: new_password,
        new_password_confirm: new_password_confirm
    }).then(function(response) {
        return response.data;
    });
};

Auth.prototype.me = function() {
    return this.context.axios.get('/auth/me')
        .then(function(response) {
            return response.data;
        });
};

Auth.prototype.set_password = function(user_id, password) {
    return this.context.axios.post('/auth/set-password', {
        user_id,
        password,
    }).then(function(response) {
        return response.data;
    });
};

Auth.prototype.last_sessions = function() {
    return this.context.axios.get('/auth/last-sessions')
        .then(function(response) {
            return response.data;
        });
};

Auth.prototype.rbac = function() {
    return this.context.axios.get('/auth/rbac', {
        transformResponse: [function (data) {
            return JSON.parse(data, function(key, value) {
                if (typeof value === "string"
                    && value.startsWith("/Function(")
                    && value.endsWith(")/")
                ) {
                    value = value.substring(10, value.length - 2);
                    return eval(`(${value})`); // eslint-disable-line no-eval
                }
                return value;
            });
        }],
    })
        .then(function(response) {
            return response.data;
        })
}

module.exports = Auth;
