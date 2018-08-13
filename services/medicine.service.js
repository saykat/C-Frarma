
const  medicine = require('../models/medicine');

module.exports.save = (newMedicine, callback) => {
    newMedicine.save(callback);
}

module.exports.viewAll = (callback) => {
    let query = medicine.find();
    query.exec(callback);
}

