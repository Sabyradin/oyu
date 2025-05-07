const express = require('express');
const router = express.Router();

// Профиль беті
router.get('/', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  
  res.render('profile', { 
    title: 'Менің профилім',
    user: req.session.user
  });
});

module.exports = router;