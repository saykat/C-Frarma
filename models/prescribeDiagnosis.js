const mongoose = require('mongoose');

const  prescribeDiagnosisSchema = mongoose.Schema({
    prescription: { type: mongoose.Schema.Types.ObjectId, ref: 'prescription' },
    diagnosisId: {
        type: String,
        required: true
    },
    status: {
        type: Number
    }
});

const  prescribeDiagnosis = mongoose.model('prescribeDiagnosis', prescribeDiagnosisSchema);

module.exports = prescribeDiagnosis;