const BaseApi = require('../BaseApi');

function QBO(context) {
    BaseApi.call(this, context);
}

QBO.prototype = Object.create(BaseApi.prototype);
QBO.prototype.constructor = QBO;

QBO.prototype.sync = function(success_uri, error_uri) {
    const syncUrl = this.context._baseUrl + '/qbo/sync?success_uri=' + success_uri + '&error_uri=' + error_uri;
    if (window) {
        window.location = syncUrl;
    } else {
        return this.context.axios.get(syncUrl)
            .then(function(response) {
                return response.data;
            });
    }
};

QBO.prototype.syncError = function() {
    return this.context.axios.get('/qbo/sync/error')
        .then(function(response) {
            return response.data;
        });
};

module.exports = QBO;
