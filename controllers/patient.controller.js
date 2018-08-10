
const patientService = require('../services/patient.service')
const  patient = require('../models/patient');


module.exports.save = (req, res, next)=>{

    let newPatient = new patient();
    newPatient.name = req.body.name;
    newPatient.age = req.body.age;
    newPatient.gender = req.body.gender;
    newPatient.address = req.body.address;
    newPatient.ref = req.body.ref;

    patientService.save(newPatient, (err, paient) => {
        if(err){
            res.json({success: false, msg: 'failed to save '});
        }else{
            res.json({success: true, msg: 'new record successfully saved'});
        }
    })
}

module.exports.view = (req, res, next) => {
    patientService.viewAll( (err, paient)=>{
        if(err){
            res.json({success: false, data: null});
        }else{
            res.json({success: true, data: paient});
        }
    })
}

module.exports.search = (req, res, next) => {
    let searchKey = req.query.searchKey;
    patientService.search(searchKey, (err, patients) => {
        if(err){
            res.json({success: false, data: null});
        }else{
            res.json({success: true, data: patients});
        }
    })
}