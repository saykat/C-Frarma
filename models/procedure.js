const mongoose = require('mongoose');



const  procedureSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    status: {
        type: Number
    }
});

const  procedure = mongoose.model('procedure', procedureSchema);

module.exports = procedure;