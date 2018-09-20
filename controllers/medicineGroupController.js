
const medicineGroupService = require('../services/medicineGroup.service');
const  medicineGroup = require('../models/medicineGroup');


module.exports.save = (req, res, next)=>{
    let today = new Date();

    let newMedicineGroup = new medicineGroup({
        _id: req.body._id,
        name: req.body.name,
        description: req.body.description,
        insertedTime: today,
        updatedTime: today,
        status: req.body.status
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

    let key = '';
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



module.exports.viewGrid = (req, res, next) => {

    let start = (req.body.start);
    let searchKey = '';
    if(req.body.search.value != undefined ){
        searchKey = req.body.search.value
    }
    let sortableColumnNo = req.body.order[0].column-1;
    if(sortableColumnNo < 0){
        sortableColumnNo=0;
    }
    let orderBy = req.body.columns[sortableColumnNo].data;
    let orderDir = 1;
    let draw = req.body.draw;
    if(req.body.order[0].dir == 'desc'){
        orderDir=-1;
    }
    let length = req.body.length;

    let queryOption = {
        start: start,
        searchKey: searchKey,
        orderBy: orderBy,
        orderDir: orderDir,
        draw: draw,
        length: length
    }

    medicineGroupService.viewGrid(queryOption,  (err, data)=>{

        if(err){
            res.json({success: false, data: null});
        }else{
            res.json({success: true, data: data.medicineGroup, recordsTotal: data.count, recordsFiltered: data.count});
        }

    })
}