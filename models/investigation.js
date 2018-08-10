const mongoose = require('mongoose');



const  investigationSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    type: {
        type: String,
    },
    status: {
        type: Number
    }
});

const  investigation = mongoose.model('investigation', investigationSchema);

module.exports = investigation;