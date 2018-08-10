const mongoose = require('mongoose');
// const AutoIncrement = require('mongoose-sequence')(mongoose);



const  prescriptionSchema = mongoose.Schema({
    visitId: {
        type: String,
        required: true
    },
    patientId: {
        type: String,
        required:true
    },
    nextVisit: {
        type: String
    },
    commit: {
        type: String
    },
    status: {
        type: Number
    },
    advices: [{ type: mongoose.Schema.Types.ObjectId, ref: 'advice' }],
    complaints: [{ type: mongoose.Schema.Types.ObjectId, ref: 'complaint' }],
    diagnosises: [{ type: mongoose.Schema.Types.ObjectId, ref: 'diagnosis' }],
    investigations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'investigation' }],
    prescribeMedicines: [{ type: mongoose.Schema.Types.ObjectId, ref: 'prescribeMedicine' }],
    procedures: [{ type: mongoose.Schema.Types.ObjectId, ref: 'procedure' }],
});
// prescriptionSchema.plugin(AutoIncrement, {inc_field: 'id'});

const  prescription = mongoose.model('prescription', prescriptionSchema);

module.exports = prescription;