const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
    leadId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lead', required: true },
    agentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    property: { type: String, required: true },
    visitDateTime: { type: Date, required: true },
    outcome: {
        type: String,
        enum: ['Pending', 'Completed - Booked', 'Completed - Not Interested', 'No Show', 'Rescheduled'],
        default: 'Pending'
    }
}, { timestamps: true });

module.exports = mongoose.model('Visit', visitSchema);