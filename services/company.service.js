
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


module.exports.viewGrid = (queryOption, callback) => {

    var searchKeyPattern = new RegExp('.*'+queryOption.searchKey+'.*', "i");

    let queryCount = company.count({
        $or: [
            {"name": searchKeyPattern}
        ]
    });
    queryCount.exec((err, count)=>{
        let query = company.find({
            $or: [
                {"name": searchKeyPattern}
            ]
        }).skip(queryOption.start).limit(queryOption.length).sort({ [queryOption.orderBy]: queryOption.orderDir});

        query.exec((err, company)=>{
            let data = {
                company: company,
                count: count
            }
            callback(err, data);
        })
    });

}


module.exports.viewCount = (queryOption, callback) => {
    var searchKeyPattern = new RegExp('.*'+queryOption.searchKey+'.*', "i");

    let query = company.count({
        $or: [
            {"name": searchKeyPattern}
        ]
    });
    query.exec(callback);
}


