const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['agent', 'admin'], default: 'agent' },
    lastAssignedAt: { type: Date, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);