const  prescribeProcedure = require('../models/prescribeProcedure');


module.exports.save = (newPrescribeProcedure, callback) => {
    newPrescribeProcedure.save(callback);
}

module.exports.viewAll = (callback) => {
    let query = prescribeProcedure.find();
    query.exec(callback);
}
