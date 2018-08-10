const mongoose = require('mongoose');

const  medicineGroupSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    }
    // prescriptions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'prescription' }]
});

const  medicineGroup = mongoose.model('medicineGroup', medicineGroupSchema);

module.exports = medicineGroup;