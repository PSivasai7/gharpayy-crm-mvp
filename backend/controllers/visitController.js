const Visit = require('../models/Visit');
const Lead = require('../models/Lead');

exports.scheduleVisit = async (req, res) => {
    try {
        const { leadId, agentId, property, visitDateTime } = req.body;

        const newVisit = new Visit({
            leadId,
            agentId,
            property,
            visitDateTime
        });

        await newVisit.save();

        const lead = await Lead.findById(leadId);
        lead.status = 'Visit Scheduled';
        lead.timeline.push({ action: `Visit Scheduled for ${property}`, performedBy: agentId });
        await lead.save();

        res.status(201).json(newVisit);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllVisits = async (req, res) => {
    try {
        const visits = await Visit.find().populate('leadId', 'name').populate('agentId', 'name');
        res.status(200).json(visits);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.updateVisitOutcome = async (req, res) => {
    try {
        const { id } = req.params;
        const { outcome } = req.body;
        const visit = await Visit.findByIdAndUpdate(id, { outcome }, { new: true });
        res.status(200).json(visit);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};