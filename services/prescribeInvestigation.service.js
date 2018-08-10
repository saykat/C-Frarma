const  prescribeInvestigation = require('../models/prescribeInvestigation');


module.exports.save = (newPrescribeInvestigation, callback) => {
    newPrescribeInvestigation.save(callback);
}

module.exports.viewAll = (callback) => {
    let query = prescribeInvestigation.find();
    query.exec(callback);
}
