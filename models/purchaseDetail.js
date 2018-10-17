const mongoose = require('mongoose');



const  purchaseDetailSchema = mongoose.Schema({
    purchaseId: {
        type: String,
        required: true
    },
    product: {
        type: String,
        required: true,
        ref: 'medicines'
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
    qty: {
        type: Number
    },
    insertedBy:{
        type: String,
        required: true
    },
    insertedTime: {
        type: Date,
        required: true
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
    }
});

const  purchaseDetail = mongoose.model('purchaseDetail', purchaseDetailSchema);

module.exports = purchaseDetail;