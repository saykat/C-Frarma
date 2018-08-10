const  prescribeDiagnosis = require('../models/prescribeDiagnosis');


module.exports.save = (newPrescribeDiagnosis, callback) => {
    newPrescribeDiagnosis.save(callback);
}

module.exports.viewAll = (callback) => {
    let query = prescribeDiagnosis.find();
    query.exec(callback);
}
