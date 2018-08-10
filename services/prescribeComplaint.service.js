const  prescribeComplaint = require('../models/prescribeComplaint');


module.exports.save = (newPrescribeComplaint, callback) => {
    newPrescribeComplaint.save(callback);
}

module.exports.viewAll = (callback) => {
    let query = prescribeComplaint.find();
    query.exec(callback);
}
