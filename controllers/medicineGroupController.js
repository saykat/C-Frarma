
const medicineGroupService = require('../services/medicineGroup.service');
const  medicineGroup = require('../models/medicineGroup');


module.exports.save = (req, res, next)=>{

    let newMedicineGroup = new medicineGroup({
        name: req.body.name,
        description: req.body.description,
    })

    medicineGroupService.save(newMedicineGroup, (err, medicineGroup) => {
        if(err){
            res.json({success: false, msg: 'Failed to save, Please Try Again'});
        }else{
            res.json({success: true, msg: 'A New Medicine Group Saved'});
        }
    })
}


module.exports.view = (req, res, next) => {

    let key = req.param('key');
    // if(key!==null && key !== '' && key!=undefined || key=='0')
    //     key='';

    medicineGroupService.viewAll( key, (err, medicineGroups)=>{
        if(err){
            res.json({success: false, data: null});
        }else{
            res.json({success: true, data: medicineGroups});
        }
    })
}