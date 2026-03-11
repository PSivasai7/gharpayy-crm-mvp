const express = require('express');
const router = express.Router();
const { scheduleVisit, getAllVisits, updateVisitOutcome } = require('../controllers/visitController');

router.post('/', scheduleVisit);
router.get('/', getAllVisits);
router.put('/:id/outcome', updateVisitOutcome);

module.exports = router;