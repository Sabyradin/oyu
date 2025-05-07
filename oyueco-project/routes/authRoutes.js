const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Кіру беті
router.get('/login', (req, res) => {
  if (req.session.user) {
    return res.redirect('/profile');
  }
  res.render('login', { title: 'Кіру' });
});

// Тіркелу беті
router.get('/register', (req, res) => {
  if (req.session.user) {
    return res.redirect('/profile');
  }
  res.render('register', { title: 'Тіркелу' });
});

// Кіру процесі
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.render('login', { 
        error: 'Қолданушы табылмады', 
        email 
      });
    }
    
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.render('login', { 
        error: 'Қате құпия сөз', 
        email 
      });
    }
    
    req.session.user = user;
    res.redirect('/profile');
  } catch (err) {
    console.error(err);
    res.render('login', { error: 'Сервер қатесі' });
  }
});

// Тіркелу процесі
router.post('/register', async (req, res) => {
  try {
    const { fullName, email, password, phone } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render('register', { 
        error: 'Бұл email бойынша тіркелген қолданушы бар', 
        fullName, 
        email, 
        phone 
      });
    }
    
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      phone,
      memberSince: new Date().getFullYear()
    });
    
    await newUser.save();
    
    req.session.user = newUser;
    res.redirect('/profile');
  } catch (err) {
    console.error(err);
    res.render('register', { error: 'Тіркелу кезінде қате пайда болды' });
  }
});

// Шығу
router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.redirect('/profile');
    }
    res.clearCookie('connect.sid');
    res.redirect('/login');
  });
});

module.exports = router;