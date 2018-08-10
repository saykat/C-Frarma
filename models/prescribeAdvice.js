const mongoose = require('mongoose');

const  prescribeAdviceSchema = mongoose.Schema({

    adviceId: {
        type: String,
        required: true
    },
    name:{type:String},
    status: {
        type: Number
    },
    prescription: { type: mongoose.Schema.Types.ObjectId, ref: 'prescription' }
});

const  prescribeAdvice = mongoose.model('prescribeAdvice', prescribeAdviceSchema);

module.exports = prescribeAdvice;