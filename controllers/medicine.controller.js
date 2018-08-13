
const medicineService = require('../services/medicine.service')
const  medicine = require('../models/medicine');


module.exports.save = (req, res, next)=>{

    let newMedicine = new medicine();
    newMedicine.name =  req.body.medicineName;
    newMedicine.group =  req.body.groupId;
    newMedicine.company =  req.body.companyId;
    newMedicine.applicationFor =  "";
    newMedicine.applicationTo =  "";
    newMedicine.sellingPrice =  req.body.price;
    newMedicine.costPrice =  req.body.costPrice;
    newMedicine.status =  req.body.status;
    newMedicine.status =  req.body.power;

    medicineService.save(newMedicine, (err, medicine) => {
        if(err){
            res.json({success: false, msg: 'failed to save '});
        }else{
            res.json({success: true, msg: 'new record successfully saved'});
        }
    })
}

module.exports.view = (req, res, next) => {
    medicineService.viewAll( (err, medicines)=>{
        if(err){
            res.json({success: false, data: null});
        }else{
            res.json({success: true, data: medicines});
        }
    })
}