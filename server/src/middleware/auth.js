const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Non autorisé' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    const user = await User.findByPk(decoded.id, {
      attributes: { exclude: ['password'] },
    });
    if (!user) {
      return res.status(401).json({ message: 'Non autorisé' });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Non autorisé' });
  }
};

module.exports = authMiddleware;