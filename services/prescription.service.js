const  prescription = require('../models/prescription');


module.exports.save = (newPrescription, callback) => {
    newPrescription.save(callback);
}

module.exports.viewAll = (callback) => {
    let query = prescription.find()
        .populate('advices')
        .populate('complaints')
        .populate('diagnosises')
        .populate('investigations')
        .populate({
            path:'prescribeMedicines',
            model: 'prescribeMedicine',
            populate: {path: 'medicine', model: 'medicines'}
        })
        .populate('procedures');

    query.exec(callback);
}
