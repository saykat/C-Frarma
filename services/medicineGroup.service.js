const  medicineGroup = require('../models/medicineGroup');

module.exports.save = (newmedicineGroup, callback) => {
    newmedicineGroup.save(callback);
}

module.exports.viewAll = (searchKey, callback) => {
        console.log('This is a test-->'+ searchKey)

        var searchKeyPattern = new RegExp('.*'+searchKey+'.*', "i");

        let query = medicineGroup.find({
            $or: [
                {"name": searchKeyPattern},
                {"description": searchKeyPattern},
            ]
        }).limit(10).sort('name');

        query.exec(callback);
}


