const mongoose = require('mongoose');

const  prescribeComplaintSchema = mongoose.Schema({
    prescription: { type: mongoose.Schema.Types.ObjectId, ref: 'prescription' },
    complaintId: {
        type: String,
        required: true
    },
    status: {
        type: Number
    }
});

const  prescribeComplaint = mongoose.model('prescribeComplaint', prescribeComplaintSchema);

module.exports = prescribeComplaint;