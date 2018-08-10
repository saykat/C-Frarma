
const  addProduct = require('../models/addProduct');


module.exports.save = (newProduct, callback) => {
    newProduct.save(callback);
}

module.exports.viewAll = (callback) => {
    let query = addProduct.find();
    query.exec(callback);
}


