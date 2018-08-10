
const complaintService = require('../services/complaint.service')
const  complaint = require('../models/complaint');


module.exports.save = (req, res, next)=>{

    let newComplaint = new complaint({
        title: req.body.title,
        description: req.body.description,
        symptoms: req.body.symptoms
    })

    complaintService.save(newComplaint, (err, complaint) => {
        if(err){
            res.json({success: false, msg: 'failed to save the complaint'});
        }else{
            res.json({success: true, msg: 'new complaint successfully saved'});
        }
    })
}

module.exports.view = (req, res, next) => {
    complaintService.viewAll( (err, complaints)=>{
        if(err){
            res.json({success: false, data: null});
        }else{
            res.json({success: true, data: complaints});
        }
    })
}