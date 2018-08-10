
const diagnosisService = require('../services/diagnosis.service')
const  diagnosis = require('../models/diagnosis');


module.exports.save = (req, res, next)=>{

    let newDiagnosis = new diagnosis({
        title: req.body.title,
        description: req.body.description,
        symptoms: req.body.symptoms
    })

    diagnosisService.save(newDiagnosis, (err, diagnosis) => {
        if(err){
            res.json({success: false, msg: 'failed to save '});
        }else{
            res.json({success: true, msg: 'new record successfully saved'});
        }
    })
}
module.exports.view = (req, res, next) => {
    diagnosisService.viewAll( (err, diagnosises)=>{
        if(err){
            res.json({success: false, data: null});
        }else{
            res.json({success: true, data: diagnosises});
        }
    })
}
