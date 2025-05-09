const express = require('express');
const {
  generateCues,
  recognizePerson
} = require('../controllers/aiController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

router.post('/generate-cues', protect, generateCues);
router.post('/recognize-person', protect, upload.single('image'), recognizePerson);

module.exports = router;