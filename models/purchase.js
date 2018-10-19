const mongoose = require('mongoose');



const  purchaseSchema = mongoose.Schema({
    invoiceNo: {
        type: String,
        required: true
    },
    comment: {
        type: String,
    },
    amount: {
        type: Number,
        required: true
    },
    discount: {
        type: Number
    },
    discountPer: {
        type: Number
    },

    insertedBy:{
        type: String,
        required: true
    },
    insertedTime: {
        type: Date,
        // required: true
    },
    updatedTime: {
        type: Date
    },
    status: {
        type: Number,
        required: true
    },
    company: {
        type: String,
        required: true,
        ref: 'company'
    },
    purchaseDetails: [{ type: mongoose.Schema.Types.ObjectId, ref: 'purchaseDetail' }]
});

const  purchase = mongoose.model('purchase', purchaseSchema);

module.exports = purchase;