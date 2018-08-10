
const  medicine = require('../models/tempMedicine');

module.exports.save = (newMedicine, callback) => {
    newMedicine.save(callback);
}

module.exports.viewAll = (callback) => {
    let query = medicine.find();
    query.exec(callback);
}

