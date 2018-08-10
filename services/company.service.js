
const  company = require('../models/company');


module.exports.save = (newCompany, callback) => {
    newCompany.save(callback);
}

module.exports.viewAll = (callback) => {
    let query = company.find();
    query.exec(callback);
}


