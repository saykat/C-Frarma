
const  saleDetails = require('../models/saleDetail');

module.exports.save = (newSaleDetail, callback) => {
    newSaleDetail.save(callback);
}

module.exports.viewAll = (callback) => {


}

