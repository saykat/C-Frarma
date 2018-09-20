
const medicineService = require('../services/medicine.service')
const  medicine = require('../models/medicine');


module.exports.save = (req, res, next)=>{
    let today = new Date();

    let newMedicine = new medicine();
    newMedicine._id =  req.body._id;
    newMedicine.name =  req.body.medicineName;
    newMedicine.group =  req.body.groupId;
    newMedicine.company =  req.body.companyId;
    newMedicine.applicationFor =  "";
    newMedicine.applicationTo =  "";
    newMedicine.sellingPrice =  req.body.price;
    newMedicine.costPrice =  req.body.costPrice;
    newMedicine.status =  req.body.status;

    newMedicine.power =  req.body.power;
    newMedicine.insertedTime =  today;
    newMedicine.updatedTime =  today;
    newMedicine.stock =  0;


    medicineService.save(newMedicine, (err, medicine) => {
        if(err){
            res.json({success: false, msg: 'failed to save '});
        }else{
            res.json({success: true, msg: 'new record successfully saved'});
        }
    })
}

module.exports.view = (req, res, next) => {

    let key = req.param('key') ||'';
    let group =  req.param('group') ||'';
    let company =  req.param('company') ||'';

    medicineService.viewAll(key, group, company, (err, medicines)=>{
        if(err){
            res.json({success: false, data: []});
        }else{
            res.json({success: true, data: medicines});
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

    medicineService.viewGrid(queryOption,  (err, data)=>{

        if(err){
            res.json({success: false, data: null});
        }else{
            res.json({success: true, data: data.medicine, recordsTotal: data.count, recordsFiltered: data.count});
        }

    })
}