const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// GET /contact -> contact form
router.get('/contact', (req, res) => {
  res.render('contact');
});

// POST /contact -> save message
router.post('/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    // Redirect or render success message
    res.redirect('/contact?success=true');
  } catch (err) {
    console.error(err);
    res.status(500).send(err.stack);
  }
});

module.exports = router;
