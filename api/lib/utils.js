const jwt = require('jsonwebtoken');
require('dotenv').config();
const multer = require('multer');
const path = require('path')
const cloudinary = require('cloudinary').v2

// Return "https" URLs by setting secure: true
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`,
    );
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 1000000 }, // 1MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase(),
    );
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb('Error: Images Only!');
  },
});

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']; // BEARER TOKEN
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return res.status(401).json({success :false, message: "Invalid Token"});
    }
        
    // in case token is not undefined we want to verify it
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        // user value that we used in sign
        if (err) return res.status(403).json({success :false, message: "You are not authorized"});;
        req.user = user
        next()
    })
  }
  
const generateAccessToken = (user) => {
return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'})
}

module.exports = {
    authenticateToken,
    generateAccessToken,
    upload,
    cloudinary
}
