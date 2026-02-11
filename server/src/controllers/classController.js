const Class = require('../models/Class');
const School = require('../models/School');

exports.createClass = async (req, res) => {
  try {
    const cls = await Class.create(req.body);
    res.status(201).json(cls);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllClasses = async (req, res) => {
  try {
    const classes = await Class.findAll({ include: [School] });
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getClassById = async (req, res) => {
  try {
    const cls = await Class.findByPk(req.params.id, { include: [School] });
    if (!cls) return res.status(404).json({ message: 'Non trouvé' });
    res.status(200).json(cls);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateClass = async (req, res) => {
  try {
    const [updated] = await Class.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ message: 'Non trouvé' });
    const cls = await Class.findByPk(req.params.id);
    res.status(200).json(cls);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteClass = async (req, res) => {
  try {
    const deleted = await Class.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Non trouvé' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};