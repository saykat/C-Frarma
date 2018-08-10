const mongoose = require('mongoose');

const  prescribeInvestigationSchema = mongoose.Schema({
    prescription: { type: mongoose.Schema.Types.ObjectId, ref: 'prescription' },
    investigationId: {
        type: String,
        required: true
    },
    status: {
        type: Number
    }
});

const  prescribeInvestigation = mongoose.model('prescribeInvestigation', prescribeInvestigationSchema);

module.exports = prescribeInvestigation;