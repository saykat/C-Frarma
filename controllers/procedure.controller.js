
const procedureService = require('../services/procedure.service')
const  procedure = require('../models/procedure');


module.exports.save = (req, res, next)=>{

    let newProcedure = new procedure({
        title: req.body.title,
        description: req.body.description,
        symptoms: req.body.symptoms
    })

    procedureService.save(newProcedure, (err, procedure) => {
        if(err){
            res.json({success: false, msg: 'failed to save '});
        }else{
            res.json({success: true, msg: 'new record successfully saved'});
        }
    })
}

module.exports.view = (req, res, next) => {
    procedureService.viewAll( (err, procedures)=>{
        if(err){
            res.json({success: false, data: null});
        }else{
            res.json({success: true, data: procedures});
        }
    })
}