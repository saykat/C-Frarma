
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
