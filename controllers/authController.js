const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const generateToken = (user) => {
  const payload = {
    id: user._id,
    role: user.role,
    fullName: user.fullName,
  };
  return jwt.sign(payload, process.env.JWT_SECRET || 'secretkey', {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

exports.register = async (req, res) => {
  try {
    const { fullName, email, password, role, phone } = req.body;
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: 'Please provide name, email and password' });
    }
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const user = await User.create({
      fullName,
      email,
      password: hashed,
      role: role || 'pet_owner',
      phone,
    });
    const token = generateToken(user);
    res.status(201).json({
      success: true,
      token,
      data: { id: user._id, fullName: user.fullName, email: user.email, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = generateToken(user);
    res.status(200).json({
      success: true,
      token,
      data: { id: user._id, fullName: user.fullName, email: user.email, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.me = async (req, res) => {
  try {
    const userId = req.user && req.user.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });
    const user = await User.findById(userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
