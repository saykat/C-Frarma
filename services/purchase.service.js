
const  purchase = require('../models/purchase');

module.exports.save = (newpurchase, callback) => {
    newpurchase.save(callback);
}

module.exports.viewAll = (callback) => {


}

module.exports.returnPurchase = (id) => {

    purchase.findByIdAndUpdate(id, {
        status: 0
    }, function () {

    });
}



module.exports.viewGrid = (queryOption, callback) => {

    var searchKeyPattern = new RegExp('.*'+queryOption.searchKey+'.*', "i");

    let queryCount = purchase.count({
        $or: [
            {"invoiceNo": searchKeyPattern}
        ],
        "status": 1
    });
    queryCount.exec((err, count)=>{
        let query = purchase.find({
            $or: [
                {"invoiceNo": searchKeyPattern}
            ],
            "status": 1
        }).populate({
            path:'purchaseDetails',
            model: 'purchaseDetail',
            populate: {
                path: 'product',
                model: 'medicines',
                populate: [{path: 'group', model: 'medicineGroup' },{path: 'company', model: 'medicineCompany' }]
            }
        }).skip(queryOption.start).limit(queryOption.length).sort({ [queryOption.orderBy]: queryOption.orderDir});

        query.exec((err, purchasess)=>{
            let data = {
                purchases: purchasess,
                count: count
            }
            callback(err, data);
        })
    });

}



module.exports.getTotalAmount = (qDate, callback)=>{
    let currentDate = new Date(qDate);

    let query = purchase.aggregate(
        [
            { $match:{
                "insertedTime": {"$gte": new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()), "$lt": new Date(currentDate.getFullYear(), currentDate.getMonth(), (currentDate.getDate()+1))}
            } },
            { "$group": {
                _id: "",
                "amount": { $sum: "$amount" }
            }}
        ]
    );

    query.exec(callback);

}

module.exports.getTotalCount= (qDate, callback)=>{
    let currentDate = new Date(qDate);

    let query = purchase.aggregate(
        [
            { $match:{
                "insertedTime": {"$gte": new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()), "$lt": new Date(currentDate.getFullYear(), currentDate.getMonth(), (currentDate.getDate()+1))}
            } },
            { "$group": {
                _id: "",
                "count": { $sum: 1 }
            }}
        ]
    );

    query.exec(callback);

}
