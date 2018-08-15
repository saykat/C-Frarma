const mongoose = require('mongoose');


const  medecineSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    group: {
        type: String,
        required: true
    },
    company: {
        type: String,
        ref: 'company'
    },
    applicationFor: {
        type: String,
    },
    applicationTo: {
        type: String,
    },
    sellingPrice: {
        type: String,
    },
    costPrice: {
        type: String,
    },
    status: {
        type: Number
    }

});

const  medecine = mongoose.model('medicines', medecineSchema);

module.exports = medecine;