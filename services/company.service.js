
const  company = require('../models/medicineCompany');


module.exports.save = (newCompany, callback) => {
    if(newCompany._id == null){
        newCompany.save(callback);
    }else{
        company.findByIdAndUpdate(newCompany._id, {
            name: newCompany.name,
            representative: newCompany.representative,
            contactNo: newCompany.contactNo,
            note: newCompany.note,
            updatedTime: newCompany.updatedTime,
            status: newCompany.status

        }, callback);
    }
}

module.exports.viewAll = (searchKey, callback) => {

    var searchKeyPattern = new RegExp('.*'+searchKey+'.*', "i");

    let query = company.find({
        $or: [
            {"name": searchKeyPattern}
        ],
        "status": 1
    }).limit(10).sort('name');

    query.exec(callback);
}


module.exports.viewGrid = (queryOption, callback) => {

    var searchKeyPattern = new RegExp('.*'+queryOption.searchKey+'.*', "i");

    let queryCount = company.count({
        $or: [
            {"name": searchKeyPattern}
        ],
        "status": 1
    });
    queryCount.exec((err, count)=>{
        let query = company.find({
            $or: [
                {"name": searchKeyPattern}
            ],
            "status": 1
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
        ],
        "status": 1
    });
    query.exec(callback);
}


