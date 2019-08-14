const BaseApi = require('../BaseApi');
const Country = require('./Country');

function Core(context) {
    BaseApi.call(this, context);

    this.country = new Country(context);
}

Core.prototype = Object.create(BaseApi.prototype);
Core.prototype.constructor = Core;


module.exports = Core;