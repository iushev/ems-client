const CRUD = require('../CRUD');

function Country(context) {
    CRUD.call(this, context, '/core/country');
}

Country.prototype = Object.create(CRUD.prototype);
Country.prototype.constructor = Country;

module.exports = Country;