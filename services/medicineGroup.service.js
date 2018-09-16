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


module.exports.viewGrid = (queryOption, callback) => {

    var searchKeyPattern = new RegExp('.*'+queryOption.searchKey+'.*', "i");

    let queryCount = medicineGroup.count({
        $or: [
            {"name": searchKeyPattern}
        ]
    });
    queryCount.exec((err, count)=>{
        let query = medicineGroup.find({
            $or: [
                {"name": searchKeyPattern}
            ]
        }).skip(queryOption.start).limit(queryOption.length).sort({ [queryOption.orderBy]: queryOption.orderDir});

        query.exec((err, medicineGroup)=>{
            let data = {
                medicineGroup: medicineGroup,
                count: count
            }
            callback(err, data);
        })
    });

}