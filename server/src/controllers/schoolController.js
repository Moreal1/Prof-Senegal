const School = require('../models/School');
const Class = require('../models/Class');

exports.createSchool = async (req, res) => {
  try {
    const school = await School.create(req.body);
    res.status(201).json(school);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllSchools = async (req, res) => {
  try {
    const schools = await School.findAll({ include: [Class] });
    res.status(200).json(schools);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSchoolById = async (req, res) => {
  try {
    const school = await School.findByPk(req.params.id, { include: [Class] });
    if (!school) return res.status(404).json({ message: 'Non trouvé' });
    res.status(200).json(school);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateSchool = async (req, res) => {
  try {
    const [updated] = await School.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ message: 'Non trouvé' });
    const school = await School.findByPk(req.params.id);
    res.status(200).json(school);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteSchool = async (req, res) => {
  try {
    const deleted = await School.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Non trouvé' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};