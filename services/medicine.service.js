
const  medicine = require('../models/medicine');

module.exports.save = (newMedicine, callback) => {
    newMedicine.save(callback);
}

module.exports.viewAll = (searchKey, group, company, callback) => {

    var searchKeyPattern = new RegExp('.*'+searchKey+'.*', "i");

    let query = medicine.find({ "name": searchKeyPattern  });

    if(group != '')  {
        query = query.where('group').equals(group);
    }

    if(company != '')  {
        query = query.where('company').equals(company);
    }

    query = query.populate('company').limit(10).sort('name');

    query.exec(callback);
}

