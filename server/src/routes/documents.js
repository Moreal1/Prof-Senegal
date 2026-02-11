const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const { uploadDocument, getAllDocuments, getDocumentById, updateDocument, deleteDocument } = require('../controllers/documentController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '..', '..', 'uploads')),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

router.post('/', auth, upload.single('file'), uploadDocument);
router.get('/', auth, getAllDocuments);
router.get('/:id', auth, getDocumentById);
router.put('/:id', auth, updateDocument);
router.delete('/:id', auth, deleteDocument);

module.exports = router;