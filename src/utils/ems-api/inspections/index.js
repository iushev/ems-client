const BaseApi = require('../BaseApi');
const Inspection = require('./Inspection');

function Inspections(context) {
    BaseApi.call(this, context);

    this.inspection = new Inspection(context);
}

Inspections.prototype = Object.create(BaseApi.prototype);
Inspections.prototype.constructor = Inspections;

module.exports = Inspections;
