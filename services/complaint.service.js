const  complaint = require('../models/complaint');

module.exports.save = (newComplaint, callback) => {
    newComplaint.save(callback);
}

module.exports.viewAll = (callback) => {
   let query = complaint.find();
   query.exec(callback);
}