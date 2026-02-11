const multer = require('multer');

// Configure storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the upload directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Append timestamp to the original file name
  }
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

// Export the upload middleware
module.exports = upload;