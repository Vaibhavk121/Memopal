const express = require('express');
const {
  registerUser,
  loginUser,
  getMe,
  uploadFaceData,
  faceLogin
} = require('../controllers/userController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.post('/face-auth', protect, upload.single('image'), uploadFaceData);
router.post('/face-login', upload.single('image'), faceLogin);

module.exports = router;