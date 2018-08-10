const mongoose = require('mongoose');



const  complaintSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    symptoms: {
        type: String,
    },
    status: {
        type: Number
    }
});

const  complaint = mongoose.model('complaint', complaintSchema);

module.exports = complaint;