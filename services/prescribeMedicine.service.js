const  prescribeMedicine = require('../models/prescribeMedicine');


module.exports.save = (newPrescribeMedicine, callback) => {
    newPrescribeMedicine.save(callback);
}

module.exports.viewAll = (callback) => {
    let query = prescribeMedicine.find();
    query.exec(callback);
}
