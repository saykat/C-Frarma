const saleService = require('../services/sale.service')
const medicineService = require('../services/medicine.service')
const  sale = require('../models/sale');
const  saleDetail = require('../models/saleDetail');


module.exports.save = (req, res, next)=>{
    let today = new Date();
    let genInvoice = today.getFullYear() +''+ today.getMonth() + '' +today.getDay() + '' +today.getHours() +''+ today.getMinutes() +'' + today.getSeconds();
    let newSale = new sale();
    newSale.invoiceNo = genInvoice;
    newSale.comment = req.body.comment;
    newSale.amount = req.body.total;
    newSale.discount = req.body.totalDiscount;
    newSale.discountPer = 0;
    newSale.insertedBy = 1;
    newSale.insertedTime = today;
    newSale.updatedTime = today;
    newSale.status = 1;
    newSale.company = 1;


    saleService.save(newSale, (err, sale) => {
        if(err){
            res.json({success: false, msg: 'failed to save '});
        }else{

            req.body.salesItem.forEach((item)=>{

                let newSaleDetail = new saleDetail();
                newSaleDetail.salesId = sale._id;
                newSaleDetail.product = item._id;
                newSaleDetail.amount = item.sellingPrice;
                newSaleDetail.discount = item.discount;
                newSaleDetail.qty = item.qty;
                newSaleDetail.discountPer = 0;
                newSaleDetail.insertedBy = 1;
                newSaleDetail.insertedTime = today;
                newSaleDetail.updatedTime = today;
                newSaleDetail.status = 1;
                newSaleDetail.company = 1;

                newSaleDetail.save()
                medicineService.updateStock(newSaleDetail.product, newSaleDetail.qty);
                sale.saleDetails.push(newSaleDetail._id);

            });
            sale.save();
            res.json({success: true, notification: 'success',  msg: 'new record successfully saved', data: {invoiceId: genInvoice}});
        }
    })
}

module.exports.modify = (req, res, next) => {

    saleService.returnSale(req.body._id);
    req.body.saleDetails.forEach((item)=>{
        medicineService.updateStock(item.product._id, (item.qty*(-1)));
    });
    res.json({success: true, notification: 'success',  msg: 'Sales Returned', data: null});

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

    saleService.viewGrid(queryOption,  (err, data)=>{

        if(err){
            res.json({success: false, data: null});
        }else{
            res.json({success: true, data: data.sales, recordsTotal: data.count, recordsFiltered: data.count});
        }

    })
}