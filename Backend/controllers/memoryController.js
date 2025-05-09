const Memory = require('../models/Memory');

// @desc    Create new memory
// @route   POST /api/memories
// @access  Private
exports.createMemory = async (req, res) => {
  try {
    req.body.user = req.user.id;
    
    const memory = await Memory.create(req.body);

    res.status(201).json({
      success: true,
      data: memory
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Get all memories for a user
// @route   GET /api/memories
// @access  Private
exports.getMemories = async (req, res) => {
  try {
    const memories = await Memory.find({ user: req.user.id });

    res.status(200).json({
      success: true,
      count: memories.length,
      data: memories
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Get single memory
// @route   GET /api/memories/:id
// @access  Private
exports.getMemory = async (req, res) => {
  try {
    const memory = await Memory.findById(req.params.id);

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

    res.status(200).json({
      success: true,
      data: memory
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Update memory
// @route   PUT /api/memories/:id
// @access  Private
exports.updateMemory = async (req, res) => {
  try {
    let memory = await Memory.findById(req.params.id);

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
        error: 'Not authorized to update this memory'
      });
    }

    // Update the updatedAt field
    req.body.updatedAt = Date.now();

    memory = await Memory.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: memory
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Delete memory
// @route   DELETE /api/memories/:id
// @access  Private
exports.deleteMemory = async (req, res) => {
  try {
    const memory = await Memory.findById(req.params.id);

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
        error: 'Not authorized to delete this memory'
      });
    }

    await memory.remove();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Add image to memory
// @route   POST /api/memories/:id/images
// @access  Private
exports.addMemoryImage = async (req, res) => {
  try {
    const memory = await Memory.findById(req.params.id);

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
        error: 'Not authorized to update this memory'
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'Please upload an image'
      });
    }

    // Add image path to memory
    memory.images.push(req.file.path);
    memory.updatedAt = Date.now();
    
    await memory.save();

    res.status(200).json({
      success: true,
      data: memory
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Add video to memory
// @route   POST /api/memories/:id/videos
// @access  Private
exports.addMemoryVideo = async (req, res) => {
  try {
    const memory = await Memory.findById(req.params.id);

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
        error: 'Not authorized to update this memory'
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'Please upload a video'
      });
    }

    // Add video path to memory
    memory.videos.push(req.file.path);
    memory.updatedAt = Date.now();
    
    await memory.save();

    res.status(200).json({
      success: true,
      data: memory
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Add conversation to memory
// @route   POST /api/memories/:id/conversations
// @access  Private
exports.addMemoryConversation = async (req, res) => {
  try {
    const memory = await Memory.findById(req.params.id);

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
        error: 'Not authorized to update this memory'
      });
    }

    // Add conversation to memory
    memory.conversations.push({
      content: req.body.content
    });
    memory.updatedAt = Date.now();
    
    await memory.save();

    res.status(200).json({
      success: true,
      data: memory
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};