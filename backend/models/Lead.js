const mongoose = require('mongoose');

const timelineSchema = new mongoose.Schema({
    action: { type: String, required: true },
    performedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    timestamp: { type: Date, default: Date.now }
});

const leadSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    leadSource: {
        type: String,
        enum: ['WhatsApp', 'Website forms', 'Social media messages', 'Phone calls', 'Lead forms', 'Calendly', 'Tally'],
        required: true
    },
    assignedAgent: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: {
        type: String,
        enum: ['New Lead', 'Contacted', 'Requirement Collected', 'Property Suggested', 'Visit Scheduled', 'Visit Completed', 'Booked', 'Lost'],
        default: 'New Lead'
    },
    inactiveReminderSent: { type: Boolean, default: false },
    timeline: [timelineSchema]
}, { timestamps: true });

module.exports = mongoose.model('Lead', leadSchema);