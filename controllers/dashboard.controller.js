
const salesService = require('../services/sale.service')
const purchaseService = require('../services/purchase.service')


module.exports.getAreaChartData = (req, res, next)=>{
    let dates = req.body;
    let index = 0;
    let a =[];
    getEachValByDate(dates, 0, [], res);
}

function getEachValByDate(dates, index, returnable, res){
    salesService.getTotalAmount(dates[index], (err, data)=>{
        if(data.length > 0){
            returnable.push(data[0].amount);
        }else{
            returnable.push(0);
        }
       index++;
       if(index==14){
           if(err){
               res.json({success: false, data: []});
           }else{
               res.json({success: true, data: returnable});
           }
       }else{
           getEachValByDate(dates, index, returnable, res);
       }
    });
}



module.exports.getTotalSalesValue = (req, res, next)=>{
    let todayDate = req.param('todayDate');
    salesService.getTotalAmount(todayDate, (err, data)=>{
        if(err){
            res.json({success: false, data: []});
        }else{
            if(data.length>0){
                res.json({success: true, data: data[0].amount});
            }else{
                res.json({success: true, data: 0});
            }
        }
    });
}

module.exports.getTotalSalesItems = (req, res, next)=>{
    let todayDate = req.param('todayDate');
    salesService.getTotalCount(todayDate, (err, data)=>{
        if(err){
            res.json({success: false, data: []});
        }else{
            if(data.length>0){
                res.json({success: true, data: data[0].count});
            }else{
                res.json({success: true, data: 0});
            }
        }
    });
}

module.exports.getTotalPurchaseValue = (req, res, next)=>{
    let todayDate = req.param('todayDate');
    purchaseService.getTotalAmount(todayDate, (err, data)=>{
        if(err){
            res.json({success: false, data: []});
        }else{
            if(data.length>0){
                res.json({success: true, data: data[0].amount});
            }else{
                res.json({success: true, data: 0});
            }
        }
    });

}
module.exports.getTotalPurchaseItem = (req, res, next)=>{
    let todayDate = req.param('todayDate');
    purchaseService.getTotalCount(todayDate, (err, data)=>{
        if(err){
            res.json({success: false, data: []});
        }else{
            if(data.length>0){
                res.json({success: true, data: data[0].count});
            }else{
                res.json({success: true, data: 0});
            }
        }
    });

}
