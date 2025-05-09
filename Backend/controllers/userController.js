const User = require('../models/User');
const axios = require('axios');

// Add these imports at the top
const fs = require('fs');
const FormData = require('form-data');

// @desc    Register user
// @route   POST /api/users
// @access  Public
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        success: false,
        error: 'User already exists'
      });
    }

    // Create user
    user = await User.create({
      name,
      email,
      password
    });

    sendTokenResponse(user, 201, res);
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Please provide an email and password'
      });
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    sendTokenResponse(user, 200, res);
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Get current logged in user
// @route   GET /api/users/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Upload face data for authentication
// @route   POST /api/users/face-auth
// @access  Private
exports.uploadFaceData = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'Please upload an image'
      });
    }

    const imagePath = req.file.path;
    
    // Send image to Python API for face encoding
    const formData = new FormData();
    formData.append('image', fs.createReadStream(imagePath));
    
    const response = await axios.post(
      `${process.env.PYTHON_API_URL}/face-encoding`,
      formData,
      {
        headers: {
          ...formData.getHeaders()
        }
      }
    );

    // Update user with face data
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { faceData: response.data.encoding },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Authenticate with face recognition
// @route   POST /api/users/face-login
// @access  Public
exports.faceLogin = async (req, res) => {
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
    
    // Add more detailed error handling
    try {
      const response = await axios.post(
        `${process.env.PYTHON_API_URL}/face-recognition`,
        formData,
        {
          headers: {
            ...formData.getHeaders()
          }
        }
      );

      if (!response.data.recognized) {
        return res.status(401).json({
          success: false,
          error: 'Face not recognized'
        });
      }

      // Find user by email (returned from Python API)
      const user = await User.findOne({ email: response.data.email });

      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'User not found'
        });
      }

      sendTokenResponse(user, 200, res);
    } catch (axiosError) {
      // Handle Python API connection errors
      console.error('Python API Error:', axiosError.message);
      return res.status(500).json({
        success: false,
        error: `Failed to connect to face recognition service: ${axiosError.message}`
      });
    }
  } catch (err) {
    console.error('Face Login Error:', err);
    res.status(400).json({
      success: false,
      error: err.message || 'An error occurred during face login'
    });
  }
};

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  res.status(statusCode).json({
    success: true,
    token
  });
};