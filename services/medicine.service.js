
const  medicine = require('../models/medicine');

module.exports.save = (newMedicine, callback) => {

    if(newMedicine._id == null){

        newMedicine.save(callback);

    }else{

        medicine.findByIdAndUpdate(newMedicine._id, {

            name: newMedicine.name,
            group: newMedicine.group,
            company: newMedicine.company,
            applicationFor: newMedicine.applicationFor,
            applicationTo: newMedicine.applicationTo,
            sellingPrice: newMedicine.sellingPrice,
            costPrice: newMedicine.costPrice,
            power: newMedicine.power,
            sellingPrice: newMedicine.sellingPrice,
            sellingPrice: newMedicine.sellingPrice,
            updatedTime: newMedicine.updatedTime,
            status: newMedicine.status

        }, callback);

    }

}

module.exports.viewAll = (searchKey, group, company, callback) => {

    var searchKeyPattern = new RegExp('.*'+searchKey+'.*', "i");

    let query = medicine.find({ "name": searchKeyPattern , "status": 1 });

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
        ],
        "status": 1
    });
    queryCount.exec((err, count)=>{
        let query = medicine.find({
            $or: [
                {"name": searchKeyPattern}
            ],
            "status": 1
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


module.exports.viewGrid = (queryOption, callback) => {

    var searchKeyPattern = new RegExp('.*'+queryOption.searchKey+'.*', "i");

    let queryCount = medicine.count({
        $or: [
            {"name": searchKeyPattern}
        ],
        "status": 1
    });
    queryCount.exec((err, count)=>{
        let query = medicine.find({
            $or: [
                {"name": searchKeyPattern}
            ],
            "status": 1
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


module.exports.updateStock = (medicineId, soldQty) => {
    medicine.findOne({ _id: medicineId }, (err, model) => {
            if(!err){
                model.stock = (model.stock - soldQty);
                model.save()
            }
    });
}

