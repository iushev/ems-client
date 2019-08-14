const axios = require('axios');

const Core = require('./core');
const Auth = require('./auth');
const Commerce = require('./commerce');
const Company = require('./company');
const Inspections = require('./inspections');
const QBO = require('./qbo');

function EmsAPI(baseUrl, authorization) {
    this._baseUrl = baseUrl;
    this._authorization = authorization;

    this.axios = this.createAxios();

    this.core = new Core(this);
    this.auth = new Auth(this);
    this.commerce = new Commerce(this);
    this.company = new Company(this);
    this.inspections = new Inspections(this);
    this.qbo = new QBO(this);
}

EmsAPI.prototype.createAxios = function() {
    const instance = axios.create({
        baseURL: this._baseUrl,
    });

    instance.defaults.xsrfCookieName = 'csrftoken';
    instance.defaults.xsrfHeaderName = 'X-CSRFToken';

    instance.interceptors.request.use(function(config) {
        if (this._authorization) {
            const token = this._authorization();
            config.headers.common['Authorization'] = 'Bearer ' + token;
        } else {
            config.headers.common['Authorization'] = null;
        }
        return config;
    }.bind(this));

    return instance;
};



module.exports = EmsAPI;
