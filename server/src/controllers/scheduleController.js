const Schedule = require('../models/Schedule');
const Class = require('../models/Class');
const School = require('../models/School');

exports.createSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.create(req.body);
    res.status(201).json(schedule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.findAll({ include: [Class, School] });
    res.status(200).json(schedules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getScheduleById = async (req, res) => {
  try {
    const schedule = await Schedule.findByPk(req.params.id, { include: [Class, School] });
    if (!schedule) return res.status(404).json({ message: 'Non trouvé' });
    res.status(200).json(schedule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateSchedule = async (req, res) => {
  try {
    const [updated] = await Schedule.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ message: 'Non trouvé' });
    const schedule = await Schedule.findByPk(req.params.id);
    res.status(200).json(schedule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteSchedule = async (req, res) => {
  try {
    const deleted = await Schedule.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Non trouvé' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};