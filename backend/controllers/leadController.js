const Lead = require('../models/Lead');
const User = require('../models/User');

exports.captureLead = async (req, res) => {
    try {
        const { name, phoneNumber, leadSource } = req.body;

        const agents = await User.find({ role: 'agent' }).sort({ lastAssignedAt: 1 });

        if (agents.length === 0) {
            return res.status(400).json({ error: 'No agents available for assignment' });
        }

        const assignedAgent = agents[0];

        const newLead = new Lead({
            name,
            phoneNumber,
            leadSource,
            assignedAgent: assignedAgent._id,
            timeline: [{ action: 'Lead Captured', performedBy: assignedAgent._id }]
        });

        await newLead.save();

        assignedAgent.lastAssignedAt = new Date();
        await assignedAgent.save();

        res.status(201).json(newLead);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateLeadStage = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, agentId } = req.body;

        const lead = await Lead.findById(id);
        if (!lead) return res.status(404).json({ error: 'Lead not found' });

        lead.status = status;
        lead.timeline.push({ action: `Moved to ${status}`, performedBy: agentId });

        await lead.save();
        res.status(200).json(lead);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getDashboardStats = async (req, res) => {
    try {
        const totalLeads = await Lead.countDocuments();
        const leadsByStage = await Lead.aggregate([
            { $group: { _id: "$status", count: { $sum: 1 } } }
        ]);

        res.status(200).json({ totalLeads, leadsByStage });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllLeads = async (req, res) => {
    try {
        const leads = await Lead.find().populate('assignedAgent', 'name email');
        res.status(200).json(leads);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};