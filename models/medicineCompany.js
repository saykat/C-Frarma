const mongoose = require('mongoose');

const  medicineCompanySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    representative: {
        type: String,
        required: true
    },
    contactNo: {
        type: String
    },
    note: {
        type: String
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
    // prescriptions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'prescription' }]
});

const  medicineCompany = mongoose.model('medicineCompany', medicineCompanySchema);

module.exports = medicineCompany;