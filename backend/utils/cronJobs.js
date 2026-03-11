const cron = require('node-cron');
const Lead = require('../models/Lead');

const checkInactiveLeads = async () => {
    try {
        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

        const inactiveLeads = await Lead.updateMany(
            {
                status: 'New Lead',
                updatedAt: { $lt: twentyFourHoursAgo },
                inactiveReminderSent: false
            },
            {
                $set: { inactiveReminderSent: true }
            }
        );

    } catch (error) {
        console.error(error);
    }
};

cron.schedule('0 0 * * *', checkInactiveLeads);

module.exports = checkInactiveLeads;