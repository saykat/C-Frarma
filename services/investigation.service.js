
const  investigation = require('../models/investigation');

module.exports.save = (newInvestigation, callback) => {
    newInvestigation.save(callback);
}

module.exports.viewAll = (callback) => {
    let query = investigation.find();
    query.exec(callback);
}
