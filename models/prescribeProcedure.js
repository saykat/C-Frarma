const mongoose = require('mongoose');

const  prescribeProcedureSchema = mongoose.Schema({
    prescription: { type: mongoose.Schema.Types.ObjectId, ref: 'prescription' },
    procedureId: {
        type: String,
        required: true
    },
    status: {
        type: Number
    }
});

const  prescribeProcedure = mongoose.model('prescribeProcedure', prescribeProcedureSchema);

module.exports = prescribeProcedure;