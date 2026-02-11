const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Assignment = sequelize.define('Assignment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  due_date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Devoir en classe',
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'to_correct',
  },
  subject: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  class_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'assignments',
  timestamps: true,
});

module.exports = Assignment;