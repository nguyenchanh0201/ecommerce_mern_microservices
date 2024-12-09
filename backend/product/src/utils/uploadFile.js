const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Define the path for the uploads directory (outside controllers)
const uploadsDir = path.join(__dirname, '..', 'uploads');

// Create the uploads directory if it doesn't exist
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadsDir); // Set the destination folder for uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Append the file extension to the filename
    }
});

// Multer upload instance with the storage configuration
const upload = multer({ storage: storage });

module.exports = upload;
