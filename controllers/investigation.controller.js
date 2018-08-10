
const investigationService = require('../services/investigation.service')
const  investigation = require('../models/investigation');


module.exports.save = (req, res, next)=>{

    let newInvestigation = new investigation({
        title: req.body.title,
        description: req.body.description,
        symptoms: req.body.symptoms
    })

    investigationService.save(newInvestigation, (err, investigation) => {
        if(err){
            res.json({success: false, msg: 'failed to save '});
        }else{
            res.json({success: true, msg: 'new record successfully saved'});
        }
    })
}

module.exports.view = (req, res, next) => {
    investigationService.viewAll( (err, investigations)=>{
        if(err){
            res.json({success: false, data: null});
        }else{
            res.json({success: true, data: investigations});
        }
    })
}
