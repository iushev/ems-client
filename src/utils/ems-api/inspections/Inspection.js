const CRUD = require('../CRUD');

function Inspection(context) {
    CRUD.call(this, context, '/inspections/inspection');
}

Inspection.prototype = Object.create(CRUD.prototype);
Inspection.prototype.constructor = Inspection;

Inspection.prototype.create = function(data, inspectionClass) {
    if (typeof inspectionClass === 'undefined' ) {
        return CRUD.prototype.create.call(this, data);
    } else {
        return this.context.axios.post(this.baseUrl + '/class-' + inspectionClass, data)
            .then(function(response) {
                return response.data;
            });
    }
};

Inspection.prototype.get = function(id, inspectionClass) {
    if (typeof inspectionClass === 'undefined' ) {
        return CRUD.prototype.get.call(this, id);
    } else {
        return this.context.axios.get(this.baseUrl + '/class-' + inspectionClass + '/' + id)
            .then(function(response) {
                return response.data;
            });
    }
};

Inspection.prototype.update = function(id, data, inspectionClass) {
    if (typeof inspectionClass === 'undefined' ) {
        return CRUD.prototype.update.call(this, data);
    } else {
        return this.context.axios.put(this.baseUrl + '/class-' + inspectionClass + '/' + id, data)
            .then(function(response) {
                return response.data;
            });
    }
};

Inspection.prototype.inpectorSign = function(id, data, inspectionClass) {
    return this.context.axios.post(this.baseUrl + '/class-' + inspectionClass + '/' + id + '/inspector-sign', data)
        .then(function(response) {
            return response.data;
        });
};

// router.post('/inspection/class-:class/:id/on-duty-sign', inspectionController.createOnDutySign);
// router.post('/inspection/class-:class/:id/owner-sign', inspectionController.createOwnerSign);

module.exports = Inspection;