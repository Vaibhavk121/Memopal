const axios = require('axios');
const Memory = require('../models/Memory');

// @desc    Generate memory cues using Gemini API
// @route   POST /api/ai/generate-cues
// @access  Private
exports.generateCues = async (req, res) => {
  try {
    const { memoryId, question } = req.body;

    if (!memoryId || !question) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a memory ID and question'
      });
    }

    const memory = await Memory.findById(memoryId);

    if (!memory) {
      return res.status(404).json({
        success: false,
        error: 'Memory not found'
      });
    }

    // Make sure user owns memory
    if (memory.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to access this memory'
      });
    }

    // Prepare context for Gemini API
    const context = {
      personName: memory.personName,
      relationship: memory.relationship,
      existingCues: memory.cues,
      conversations: memory.conversations.map(c => c.content),
      notes: memory.notes
    };

    // Send request to Python API which will handle Gemini API call
    const response = await axios.post(
      `${process.env.PYTHON_API_URL}/generate-cues`,
      {
        context,
        question
      }
    );

    // Add new cues to memory
    if (response.data.cues && response.data.cues.length > 0) {
      memory.cues = [...new Set([...memory.cues, ...response.data.cues])];
      memory.updatedAt = Date.now();
      await memory.save();
    }

    res.status(200).json({
      success: true,
      data: {
        answer: response.data.answer,
        cues: response.data.cues,
        memory
      }
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Recognize person in image
// @route   POST /api/ai/recognize-person
// @access  Private
exports.recognizePerson = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'Please upload an image'
      });
    }

    const imagePath = req.file.path;
    
    // Send image to Python API for face recognition
    const formData = new FormData();
    formData.append('image', fs.createReadStream(imagePath));
    formData.append('userId', req.user.id);
    
    const response = await axios.post(
      `${process.env.PYTHON_API_URL}/recognize-person`,
      formData,
      {
        headers: {
          ...formData.getHeaders()
        }
      }
    );

    if (!response.data.recognized) {
      return res.status(200).json({
        success: true,
        recognized: false,
        message: 'No known person recognized in the image'
      });
    }

    // Find the memory for the recognized person
    const memory = await Memory.findById(response.data.memoryId);

    res.status(200).json({
      success: true,
      recognized: true,
      data: {
        memory
      }
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// Add these imports at the top
const fs = require('fs');
const FormData = require('form-data');