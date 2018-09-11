
const  company = require('../models/medicineCompany');


module.exports.save = (newCompany, callback) => {
    newCompany.save(callback);
}

module.exports.viewAll = (searchKey, callback) => {

    var searchKeyPattern = new RegExp('.*'+searchKey+'.*', "i");

    let query = company.find({
        $or: [
            {"name": searchKeyPattern}
        ]
    }).limit(10).sort('name');

    query.exec(callback);
}


