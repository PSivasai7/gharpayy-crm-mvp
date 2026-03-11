const express = require('express');
const router = express.Router();
const { captureLead, updateLeadStage, getDashboardStats, getAllLeads } = require('../controllers/leadController');

router.post('/webhook', captureLead);
router.put('/:id/stage', updateLeadStage);
router.get('/stats', getDashboardStats);
router.get('/', getAllLeads);

module.exports = router;