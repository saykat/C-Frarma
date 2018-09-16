
const companyService = require('../services/company.service')
const  company = require('../models/medicineCompany');


module.exports.save = (req, res, next)=>{

    let newCompany = new company({
        name: req.body.name,
        representative: req.body.representative,
        contactNo: req.body.contactNo,
        note: req.body.note
    })

    companyService.save(newCompany, (err, company) => {
        if(err){
            res.json({success: false, msg: 'failed to save '});
        }else{
            res.json({success: true, msg: 'new record successfully saved'});
        }
    })
}


module.exports.view = (req, res, next) => {
    let key = req.param('key');

    companyService.viewAll(key,  (err, company)=>{
        if(err){
            res.json({success: false, data: null});
        }else{
            res.json({success: true, data: company});
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

    companyService.viewGrid(queryOption,  (err, data)=>{

        if(err){
            res.json({success: false, data: null});
        }else{
            res.json({success: true, data: data.company, recordsTotal: data.count, recordsFiltered: data.count});
        }

    })
}