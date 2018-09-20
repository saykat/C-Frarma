const mongoose = require('mongoose');

const  companySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contactNo: {
        type: String
    },
    type: {
        type: String,
        required: true
    },
    insertedTime:{
        type: String,
        required: true
    },
    updatedTime: {
        type: Date
    },
    status: {
        type: Number,
        required: true
    }
    // prescriptions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'prescription' }]
});

const  company = mongoose.model('company', companySchema);

module.exports = company;