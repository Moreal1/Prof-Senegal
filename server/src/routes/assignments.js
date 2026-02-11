const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createAssignment, getAllAssignments, getAssignmentById, updateAssignment, deleteAssignment } = require('../controllers/assignmentController');

router.post('/', auth, createAssignment);
router.get('/', auth, getAllAssignments);
router.get('/:id', auth, getAssignmentById);
router.put('/:id', auth, updateAssignment);
router.delete('/:id', auth, deleteAssignment);

module.exports = router;