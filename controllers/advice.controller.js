
const adviceService = require('../services/company.service')
const  advice = require('../models/medicineCompany');


module.exports.save = (req, res, next)=>{

    let newAdvice = new advice({
        name: req.body.name,
        representative: req.body.representative,
        contactNo: req.body.contactNo,
        note: req.body.note
    })

    adviceService.save(newAdvice, (err, advice) => {
        if(err){
            res.json({success: false, msg: 'failed to save '});
        }else{
            res.json({success: true, msg: 'new record successfully saved'});
        }
    })
}


module.exports.view = (req, res, next) => {
    adviceService.viewAll( (err, advices)=>{
        if(err){
            res.json({success: false, data: null});
        }else{
            res.json({success: true, data: advices});
        }
    })
}