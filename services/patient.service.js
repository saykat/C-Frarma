const  patient = require('../models/patient');

module.exports.save = (newPatient, callback) => {
    newPatient.save(callback);
}

module.exports.viewAll = (callback) => {
    let query = patient.find();
    query.exec(callback);
}

module.exports.search = (searchKey, callback) => {
    let searchId = 0;
    if(!isNaN(searchKey)){
        searchId = searchKey;
    }
    let query = patient.find(
        {
            $or:[
                {"id": searchId},
                {"name":{ $regex: '.*' + searchKey + '.*' }},
                {"address": { $regex: '.*' + searchKey + '.*' }},
                {"phone": { $regex: searchKey + '.*' }},
            ]
        }
    ).limit(10).sort('id');
    query.exec(callback);
}

module.exports.findOne = (callback) => {

}
