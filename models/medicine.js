const mongoose = require('mongoose');



const  medecineSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    group: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    applicationFor: {
        type: String,
    },
    applicationTo: {
        type: String,
    },
    sellingPrice: {
        type: String,
    },
    costPrice: {
        type: String,
    },
    status: {
        type: Number
    },
    prescribeMedicines: [{ type: mongoose.Schema.Types.ObjectId, ref: 'prescribeMedicine' }]
});

const  medecine = mongoose.model('medicines', medecineSchema);

module.exports = medecine;