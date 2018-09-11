
const companyService = require('../services/company.service')
const  company = require('../models/medicineCompany');


module.exports.save = (req, res, next)=>{

    let newCompany = new company({
        name: req.body.name,
        representative: req.body.representative,
        contactNo: req.body.contactNo,
        note: req.body.note
    })

    companyService.save(newCompany, (err, company) => {
        if(err){
            res.json({success: false, msg: 'failed to save '});
        }else{
            res.json({success: true, msg: 'new record successfully saved'});
        }
    })
}


module.exports.view = (req, res, next) => {
    let key = req.param('key');

    companyService.viewAll(key,  (err, company)=>{
        if(err){
            res.json({success: false, data: null});
        }else{
            res.json({success: true, data: company});
        }
    })
}