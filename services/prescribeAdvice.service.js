
const  prescribeAdvice = require('../models/prescribeAdvice');


module.exports.save = (newPrescribeAdvice, callback) => {
    newPrescribeAdvice.save(callback);
}

module.exports.viewAll = (callback) => {
    let query = prescribeAdvice.find();
    query.exec(callback);
}


