const saleService = require('../services/sale.service')
const  sale = require('../models/sale');
const  saleDetail = require('../models/saleDetail');


module.exports.save = (req, res, next)=>{
    let today = new Date();
    let genInvoice = today.getFullYear() + today.getMonth() + today.getDay() + today.getHours() + today.getMinutes() + today.getSeconds();
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
                newSaleDetail.discountPer = 0;
                newSaleDetail.insertedBy = 1;
                newSaleDetail.insertedTime = today;
                newSaleDetail.updatedTime = today;
                newSaleDetail.status = 1;
                newSaleDetail.company = 1;

                newSaleDetail.save()
                sale.saleDetails.push(newSaleDetail._id);

            });
            sale.save();
            res.json({success: true, msg: 'new record successfully saved'});
        }
    })
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