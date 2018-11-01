const purchaseService = require('../services/purchase.service')
const medicineService = require('../services/medicine.service')
const  purchase = require('../models/purchase');
const  purchaseDetail = require('../models/purchaseDetail');


module.exports.save = (req, res, next)=>{
    let today = new Date();
    let genInvoice = today.getFullYear() +''+ today.getMonth() + '' +today.getDay() + '' +today.getHours() +''+ today.getMinutes() +'' + today.getSeconds();
    let newPurchase = new purchase();
    newPurchase.invoiceNo = genInvoice;
    newPurchase.comment = req.body.comment;
    newPurchase.amount = req.body.total;
    newPurchase.discount = req.body.totalDiscount;
    newPurchase.discountPer = 0;
    newPurchase.insertedBy = 1;
    newPurchase.insertedTime = today;
    newPurchase.updatedTime = today;
    newPurchase.status = 1;
    newPurchase.company = 1;


    purchaseService.save(newPurchase, (err, purchase) => {
        if(err){
            res.json({success: false, msg: 'failed to save '});
        }else{

            req.body.purchaseItem.forEach((item)=>{

                let newPurchaseDetail = new purchaseDetail();
                newPurchaseDetail.purchaseId = purchase._id;
                newPurchaseDetail.product = item._id;
                newPurchaseDetail.amount = item.sellingPrice;
                newPurchaseDetail.discount = item.discount;
                newPurchaseDetail.qty = item.qty;
                newPurchaseDetail.discountPer = 0;
                newPurchaseDetail.insertedBy = 1;
                newPurchaseDetail.insertedTime = today;
                newPurchaseDetail.updatedTime = today;
                newPurchaseDetail.status = 1;
                newPurchaseDetail.company = 1;

                newPurchaseDetail.save();
                medicineService.updateStock(newPurchaseDetail.product, (newPurchaseDetail.qty) * (-1));
                purchase.purchaseDetails.push(newPurchaseDetail._id);

            });
            purchase.save();
            res.json({success: true, notification: 'success',  msg: 'new record successfully saved', data: {invoiceId: genInvoice}});
        }
    })
}

module.exports.modify = (req, res, next) => {

    purchaseService.returnPurchase(req.body._id);
    req.body.purchaseDetails.forEach((item)=>{
        medicineService.updateStock(item.product._id, (item.qty));
    });
    res.json({success: true, notification: 'success',  msg: 'Purchase Canceled', data: null});

}
module.exports.view = (req, res, next) => {

    let key = req.param('key') ||'';
    let group =  req.param('group') ||'';
    let company =  req.param('company') ||'';

    medicineService.viewAll(key, group, company, (err, medicines)=>{
        if(err){
            res.json({success: false, data: []});
        }else{
            res.json({success: true, data: medicines});
        }
    })
}


module.exports.viewGrid = (req, res, next) => {

    let start = (req.body.start);
    let searchKey = '';
    if(req.body.search.value != undefined ){
        searchKey = req.body.search.value
    }
    let sortableColumnNo = req.body.order[0].column-1;
    if(sortableColumnNo < 0){
        sortableColumnNo=0;
    }
    let orderBy = req.body.columns[sortableColumnNo].data;
    let orderDir = 1;
    let draw = req.body.draw;
    if(req.body.order[0].dir == 'desc'){
        orderDir=-1;
    }
    let length = req.body.length;

    let queryOption = {
        start: start,
        searchKey: searchKey,
        orderBy: orderBy,
        orderDir: orderDir,
        draw: draw,
        length: length
    }

    purchaseService.viewGrid(queryOption,  (err, data)=>{

        if(err){
            res.json({success: false, data: null});
        }else{
            res.json({success: true, data: data.purchases, recordsTotal: data.count, recordsFiltered: data.count});
        }

    })
}