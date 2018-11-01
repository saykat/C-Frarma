
const salesService = require('../services/sale.service')


module.exports.getAreaChartData = (req, res, next)=>{
    let dates = req.body;
    let index = 0;
    let a =[];
    getEachValByDate(dates, 0, [], res);
}

function getEachValByDate(dates, index, returnable, res){
    salesService.getAreaChartData(dates[index], (err, data)=>{
       returnable.push(data);
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