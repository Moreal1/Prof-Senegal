const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createClass, getAllClasses, getClassById, updateClass, deleteClass } = require('../controllers/classController');

router.post('/', auth, createClass);
router.get('/', auth, getAllClasses);
router.get('/:id', auth, getClassById);
router.put('/:id', auth, updateClass);
router.delete('/:id', auth, deleteClass);

module.exports = router;