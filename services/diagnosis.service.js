
const  diagnosis = require('../models/diagnosis');


module.exports.save = (newDiagnosis, callback) => {
    newDiagnosis.save(callback);
}

module.exports.viewAll = (callback) => {
    let query = diagnosis.find();
    query.exec(callback);
}

