
const  procedure = require('../models/procedure');

module.exports.save = (newProcedure, callback) => {
    newProcedure.save(callback);
}

module.exports.viewAll = (callback) => {
    let query = procedure.find();
    query.exec(callback);
}

