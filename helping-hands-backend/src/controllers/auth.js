const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

exports.register = async (req, res) => {
  try {
    const { email, password, name, userType } = req.body;
    
    // Check if user already exists
    const userExists = await db.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    
    if (userExists.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Begin transaction
    await db.query('BEGIN');
    
    // Create user
    const newUser = await db.query(
      'INSERT INTO users (email, password_hash, user_type) VALUES ($1, $2, $3) RETURNING id',
      [email, hashedPassword, userType]
    );
    
    const userId = newUser.rows[0].id;
    
    // Create profile based on user type
    if (userType === 'donor') {
      await db.query(
        'INSERT INTO donors (id, name) VALUES ($1, $2)',
        [userId, name]
      );
    } else if (userType === 'volunteer') {
      await db.query(
        'INSERT INTO volunteers (id, name) VALUES ($1, $2)',
        [userId, name]
      );
    } else if (userType === 'facility') {
      const { facilityName, address, city, state, zipCode, phoneNumber, website, description } = req.body;
      
      await db.query(
        'INSERT INTO facilities (id, name, address, city, state, zip_code, phone, website, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
        [userId, facilityName, address, city, state, zipCode, phoneNumber, website, description]
      );
    }
    
    // Commit transaction
    await db.query('COMMIT');
    
    // Generate JWT token
    const token = jwt.sign(
      { id: userId, email, userType },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );
    
    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });
    
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: {
        id: userId,
        email,
        userType
      }
    });
  } catch (error) {
    await db.query('ROLLBACK');
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred during registration'
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password, userType } = req.body;
    
    // Check if user exists
    const userResult = await db.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    
    if (userResult.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
    
    const user = userResult.rows[0];
    
    // Check if user type matches
    if (user.user_type !== userType) {
      return res.status(401).json({
        success: false,
        message: `Invalid user type. You are registered as a ${user.user_type}`
      });
    }
    
    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, userType: user.user_type },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );
    
    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });
    
    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        userType: user.user_type
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred during login'
    });
  }
};

exports.logout = (req, res) => {
  res.clearCookie('token');
  
  res.status(200).json({
    success: true,
    message: 'Logout successful'
  });
};

exports.getCurrentUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const userType = req.user.userType;
    
    let userData;
    
    // Get user data based on user type
    if (userType === 'donor') {
      const result = await db.query(
        'SELECT d.*, u.email FROM donors d JOIN users u ON d.id = u.id WHERE d.id = $1',
        [userId]
      );
      userData = result.rows[0];
    } else if (userType === 'volunteer') {
      const result = await db.query(
        'SELECT v.*, u.email FROM volunteers v JOIN users u ON v.id = u.id WHERE v.id = $1',
        [userId]
      );
      userData = result.rows[0];
    } else if (userType === 'facility') {
      const result = await db.query(
        'SELECT f.*, u.email FROM facilities f JOIN users u ON f.id = u.id WHERE f.id = $1',
        [userId]
      );
      userData = result.rows[0];
    }
    
    if (!userData) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Remove sensitive data
    delete userData.password_hash;
    
    res.status(200).json({
      success: true,
      user: userData
    });
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching user data'
    });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    
    // Check if user exists
    const userResult = await db.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    
    if (userResult.rows.length === 0) {
      // Don't reveal if email exists or not for security
      return res.status(200).json({
        success: true,
        message: 'If your email is registered, you will receive password reset instructions'
      });
    }
    
    const user = userResult.rows[0];
    
    // Generate reset token
    const resetToken = jwt.sign(
      { id: user.id },
      process.env.JWT_RESET_SECRET,
      { expiresIn: '1h' }
    );
    
    // TODO: Send email with reset link
    // In a real application, you would integrate with an email service like SendGrid or Mailgun
    
    console.log(`Reset token for ${email}: ${resetToken}`);
    
    res.status(200).json({
      success: true,
      message: 'If your email is registered, you will receive password reset instructions'
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while processing your request'
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_RESET_SECRET);
    
    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Update password
    await db.query(
      'UPDATE users SET password_hash = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
      [hashedPassword, decoded.id]
    );
    
    res.status(200).json({
      success: true,
      message: 'Password reset successful'
    });
  } catch (error) {
    console.error('Reset password error:', error);
    
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired token'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'An error occurred while resetting your password'
    });
  }
};