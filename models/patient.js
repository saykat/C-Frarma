const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);


const  patientSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
    },
    gender: {
        type: String,
    },
    address: {
        type: String,
    },
    phone: {
        type: String,
    },
    status: {
        type: Number
    }
});

patientSchema.plugin(AutoIncrement, {inc_field: 'id'});

const  patient = mongoose.model('patient', patientSchema);
module.exports = patient;