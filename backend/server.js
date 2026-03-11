const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

connectDB();
require('./utils/cronJobs');
app.use(cors());
app.use(express.json());

const leadRoutes = require('./routes/leadRoutes');
const visitRoutes = require('./routes/visitRoutes');

app.use('/api/leads', leadRoutes);
app.use('/api/visits', visitRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));