
const medicineService = require('../services/medicine.service')
const  medicine = require('../models/tempMedicine');


module.exports.save = (req, res, next)=>{
    let reqData = req.body;
    reqData.forEach((data)=>{
        let newMedicine = new medicine({
            name: data[2],
            genericName: data[3],
            power: data[4],
            type: data[5],
            price: data[6],
            applicableTo: data[7],
            DAR: data[8],
            brand: data[1],
        })

        medicineService.save(newMedicine, (err, medicine) => {
        })
    })
    res.json({success: true, msg: 'saved '});
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