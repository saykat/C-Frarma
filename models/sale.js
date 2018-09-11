const mongoose = require('mongoose');



const  saleSchema = mongoose.Schema({
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
    saleDetails: [{ type: mongoose.Schema.Types.ObjectId, ref: 'saleDetail' }]
});

const  sale = mongoose.model('sale', saleSchema);

module.exports = sale;