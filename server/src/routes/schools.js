const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createSchool, getAllSchools, getSchoolById, updateSchool, deleteSchool } = require('../controllers/schoolController');

router.post('/', auth, createSchool);
router.get('/', auth, getAllSchools);
router.get('/:id', auth, getSchoolById);
router.put('/:id', auth, updateSchool);
router.delete('/:id', auth, deleteSchool);

module.exports = router;