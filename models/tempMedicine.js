const mongoose = require('mongoose');



const  tempMedecineSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    genericName: {
        type: String
    },
    power: {
        type: String
    },
    type: {
        type: String
    },
    price: {
        type: String
    },
    applicableTo: {
        type: String
    },
    DAR: {
        type: String
    },
    brand: {
        type: String
    }
});

const  tempMedecine = mongoose.model('tempMedicines', tempMedecineSchema);

module.exports = tempMedecine;