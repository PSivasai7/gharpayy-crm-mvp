const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI);

const seedData = async () => {
    await User.deleteMany({});

    const agent1 = new User({ name: 'Agent Alpha', email: 'alpha@test.com', role: 'agent' });
    const agent2 = new User({ name: 'Agent Beta', email: 'beta@test.com', role: 'agent' });

    await agent1.save();
    await agent2.save();

    const sources = ['WhatsApp', 'Website forms', 'Social media messages', 'Phone calls', 'Lead forms'];

    for (let i = 1; i <= 5; i++) {
        await fetch('http://localhost:5000/api/leads/webhook', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: `Test Lead ${i}`,
                phoneNumber: `987654321${i}`,
                leadSource: sources[i % sources.length]
            })
        });
    }

    console.log('Seeding complete! Check your MongoDB database.');
    process.exit();
};

seedData();