const mongoose = require('mongoose');


const  medecineSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    group: {
        type: String,
        ref: 'medicineGroup'
    },
    company: {
        type: String,
        ref: 'medicineCompany'
    },
    applicationFor: {
        type: String,
    },
    applicationTo: {
        type: String,
    },
    sellingPrice: {
        type: Number,
    },
    costPrice: {
        type: Number,
    },
    status: {
        type: Number
    }

});

const  medecine = mongoose.model('medicines', medecineSchema);

module.exports = medecine;