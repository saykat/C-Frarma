
const addProductService = require('../services/addProduct.service')
const  addProduct = require('../models/addProduct');


module.exports.save = (req, res, next)=>{

    let newAddProduct = new addProduct({
        medicineName: req.body.medicineName,
        groupName: req.body.groupName,
        states: req.body.states,
        power: req.body.power,
        price: req.body.price,
    });

    addProductService.save(newAddProduct, (err, addProduct) => {
        if(err){
            res.json({success: false, msg: 'failed to save '});
        }else{
            res.json({success: true, msg: 'new record successfully saved'});
        }
    })
}


module.exports.view = (req, res, next) => {
    addProductService.viewAll( (err, addProduct)=>{
        if(err){
            res.json({success: false, data: null});
        }else{
            res.json({success: true, data: addProduct});
        }
    })
}