const mongoose = require('mongoose');



const  diagnosisSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    status: {
        type: Number
    }
});

const  diagnosis = mongoose.model('diagnosis', diagnosisSchema);

module.exports = diagnosis;