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
    stock: {
        type: Number,
    },
    power: {
        type: String,
    },
    insertedTime:{
        type: Date,
        required: true
    },
    updatedTime: {
        type: Date
    },
    status: {
        type: Number
    }

});

const  medecine = mongoose.model('medicines', medecineSchema);

module.exports = medecine;