const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const sequelize = require('./config/db');
const User = require('./models/User');
const School = require('./models/School');
const Class = require('./models/Class');
const Schedule = require('./models/Schedule');
const Assignment = require('./models/Assignment');
const Document = require('./models/Document');

// Associations
School.hasMany(Class, { foreignKey: 'school_id', onDelete: 'CASCADE' });
Class.belongsTo(School, { foreignKey: 'school_id' });

School.hasMany(Schedule, { foreignKey: 'schoolId', onDelete: 'CASCADE' });
Schedule.belongsTo(School, { foreignKey: 'schoolId' });

Class.hasMany(Schedule, { foreignKey: 'classId', onDelete: 'CASCADE' });
Schedule.belongsTo(Class, { foreignKey: 'classId' });

Class.hasMany(Assignment, { foreignKey: 'class_id', onDelete: 'CASCADE' });
Assignment.belongsTo(Class, { foreignKey: 'class_id' });

Class.hasMany(Document, { foreignKey: 'class_id', onDelete: 'CASCADE' });
Document.belongsTo(Class, { foreignKey: 'class_id' });

const authRoutes = require('./routes/auth');
const schoolRoutes = require('./routes/schools');
const classRoutes = require('./routes/classes');
const scheduleRoutes = require('./routes/schedules');
const assignmentRoutes = require('./routes/assignments');
const documentRoutes = require('./routes/documents');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Route d'accueil
app.get('/', (req, res) => {
  res.json({
    message: '✅ API Prof Sénégal',
    status: 'En ligne',
    endpoints: {
      auth: '/api/auth',
      schools: '/api/schools',
      classes: '/api/classes',
      schedules: '/api/schedules',
      assignments: '/api/assignments',
      documents: '/api/documents',
    }
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/schools', schoolRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/schedules', scheduleRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/documents', documentRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

sequelize.sync({ alter: true })
  .then(() => {
    console.log('✅ Base de données SQLite synchronisée');
    app.listen(PORT, () => {
      console.log(`🚀 Serveur lancé sur le port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Erreur de synchronisation:', err);
  });