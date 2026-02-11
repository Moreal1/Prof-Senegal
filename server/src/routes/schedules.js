const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createSchedule, getAllSchedules, getScheduleById, updateSchedule, deleteSchedule } = require('../controllers/scheduleController');

router.post('/', auth, createSchedule);
router.get('/', auth, getAllSchedules);
router.get('/:id', auth, getScheduleById);
router.put('/:id', auth, updateSchedule);
router.delete('/:id', auth, deleteSchedule);

module.exports = router;