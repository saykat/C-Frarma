
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

    query = query.populate('company').populate('group').limit(10).sort('name');

    query.exec(callback);
}



module.exports.viewGrid = (queryOption, callback) => {

    var searchKeyPattern = new RegExp('.*'+queryOption.searchKey+'.*', "i");

    let queryCount = medicine.count({
        $or: [
            {"name": searchKeyPattern}
        ]
    });
    queryCount.exec((err, count)=>{
        let query = medicine.find({
            $or: [
                {"name": searchKeyPattern}
            ]
        }).populate('company').populate('group').skip(queryOption.start).limit(queryOption.length).sort({ [queryOption.orderBy]: queryOption.orderDir});

        query.exec((err, medicine)=>{
            let data = {
                medicine: medicine,
                count: count
            }
            callback(err, data);
        })
    });

}