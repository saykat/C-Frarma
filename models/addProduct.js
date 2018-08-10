const mongoose = require('mongoose');
const addProductSchema = mongoose.Schema({
    medicineName: {
        type: String
    },
    groupName: {
        type: String
    },
    states: {
        type: String
    },
    power: {
        type: String
    },
    price: {
        type: String
    }

});
const addProduct = mongoose.model('addProduct', addProductSchema);
module.exports= addProduct;