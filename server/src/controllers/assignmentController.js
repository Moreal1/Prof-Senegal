const Assignment = require('../models/Assignment');
const Class = require('../models/Class');

exports.createAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.create(req.body);
    res.status(201).json(assignment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.findAll({ include: [Class] });
    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAssignmentById = async (req, res) => {
  try {
    const assignment = await Assignment.findByPk(req.params.id, { include: [Class] });
    if (!assignment) return res.status(404).json({ message: 'Non trouvé' });
    res.status(200).json(assignment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateAssignment = async (req, res) => {
  try {
    const [updated] = await Assignment.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ message: 'Non trouvé' });
    const assignment = await Assignment.findByPk(req.params.id);
    res.status(200).json(assignment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteAssignment = async (req, res) => {
  try {
    const deleted = await Assignment.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Non trouvé' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};