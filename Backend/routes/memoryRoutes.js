const express = require('express');
const {
  createMemory,
  getMemories,
  getMemory,
  updateMemory,
  deleteMemory,
  addMemoryImage,
  addMemoryVideo,
  addMemoryConversation
} = require('../controllers/memoryController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

router.route('/')
  .get(protect, getMemories)
  .post(protect, createMemory);

router.route('/:id')
  .get(protect, getMemory)
  .put(protect, updateMemory)
  .delete(protect, deleteMemory);

router.post('/:id/images', protect, upload.single('image'), addMemoryImage);
router.post('/:id/videos', protect, upload.single('video'), addMemoryVideo);
router.post('/:id/conversations', protect, addMemoryConversation);

module.exports = router;