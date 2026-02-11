const Document = require('../models/Document');
const Class = require('../models/Class');

// Create a new document
exports.createDocument = async (req, res) => {
    try {
        const document = new Document({
            title: req.body.title,
            description: req.body.description,
            fileUrl: req.file.path,
            class: req.body.class,
            subject: req.body.subject,
            year: req.body.year,
            type: req.body.type || 'Cours',
        });
        await document.save();
        res.status(201).json({ message: 'Document created successfully', document });
    } catch (error) {
        res.status(500).json({ message: 'Error creating document', error });
    }
};

// Get all documents
exports.getAllDocuments = async (req, res) => {
  try {
    const documents = await Document.findAll({ include: [Class] });
    res.status(200).json(documents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a document by ID
exports.getDocumentById = async (req, res) => {
  try {
    const document = await Document.findByPk(req.params.id, { include: [Class] });
    if (!document) return res.status(404).json({ message: 'Non trouvé' });
    res.status(200).json(document);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a document
exports.updateDocument = async (req, res) => {
  try {
    const [updated] = await Document.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ message: 'Non trouvé' });
    const document = await Document.findByPk(req.params.id);
    res.status(200).json(document);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a document
exports.deleteDocument = async (req, res) => {
  try {
    const deleted = await Document.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Non trouvé' });
    res.status(200).json({ message: 'Document supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Upload a document
exports.uploadDocument = async (req, res) => {
  try {
    const document = await Document.create({
      title: req.body.title,
      file_path: req.file ? req.file.path : null,
      class_id: req.body.class_id,
      subject: req.body.subject,
      year: req.body.year,
      type: req.body.type || 'Cours',
    });
    res.status(201).json(document);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};