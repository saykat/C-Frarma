
const  sale = require('../models/sale');

module.exports.save = (newSale, callback) => {
    newSale.save(callback);
}

module.exports.viewAll = (callback) => {


}

module.exports.returnSale = (id) => {

    sale.findByIdAndUpdate(id, {
        status: 0
    }, function () {
        
    });
}


module.exports.viewGrid = (queryOption, callback) => {

    var searchKeyPattern = new RegExp('.*'+queryOption.searchKey+'.*', "i");

    let queryCount = sale.count({
        $or: [
            {"invoiceNo": searchKeyPattern}
        ],
        "status": 1
    });
    queryCount.exec((err, count)=>{
        let query = sale.find({
            $or: [
                {"invoiceNo": searchKeyPattern}
            ],
            "status": 1
        }).populate({
            path:'saleDetails',
            model: 'saleDetail',
            populate: {
                path: 'product',
                model: 'medicines',
                populate: [{path: 'group', model: 'medicineGroup' },{path: 'company', model: 'medicineCompany' }]
            }
        }).skip(queryOption.start).limit(queryOption.length).sort({ [queryOption.orderBy]: queryOption.orderDir});

        query.exec((err, sales)=>{
            let data = {
                sales: sales,
                count: count
            }
            callback(err, data);
        })
    });

}

module.exports.getAreaChartData = (qDate, callback)=>{
    let currentDate = new Date(qDate);
    let query = sale.count({
        "insertedTime": {"$gte": new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()), "$lt": new Date(currentDate.getFullYear(), currentDate.getMonth(), (currentDate.getDate()+1))}
    });

    query.exec(callback);

}
