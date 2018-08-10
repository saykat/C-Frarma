const mongoose = require('mongoose');

const  prescribeMedicineSchema = mongoose.Schema({
    prescription: { type: mongoose.Schema.Types.ObjectId, ref: 'prescription' },
    medicine: { type: mongoose.Schema.Types.ObjectId, ref: 'medicine' },
    power:{
        type: String,
        required: true
    },
    dose:{
        type: String,
        required: true
    },
    days:{
        type: String,
        required: true
    },
    status: {
        type: Number
    }
});

const  prescribeMedicine = mongoose.model('prescribeMedicine', prescribeMedicineSchema);

module.exports = prescribeMedicine;