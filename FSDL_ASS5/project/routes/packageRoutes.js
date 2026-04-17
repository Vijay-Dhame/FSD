const express = require('express');
const router = express.Router();
const Package = require('../models/Package');

// GET / -> home page (assuming home page might display some featured packages, returning 3 latest)
router.get('/', async (req, res) => {
  try {
    const featuredPackages = await Package.find().limit(3).lean();
    res.render('index', { featuredPackages });
  } catch (err) {
    console.error(err);
    res.status(500).send(err.stack);
  }
});

// GET /packages -> list packages
router.get('/packages', async (req, res) => {
  try {
    const packages = await Package.find().lean();
    res.render('packages', { packages });
  } catch (err) {
    console.error(err);
    res.status(500).send(err.stack);
  }
});

// GET /add-package -> form page
router.get('/add-package', (req, res) => {
  res.render('addPackage');
});

// POST /add-package -> save package
router.post('/add-package', async (req, res) => {
  try {
    const { title, destination, price, duration, description } = req.body;
    const newPackage = new Package({
      title, destination, price, duration, description
    });
    await newPackage.save();
    res.redirect('/packages');
  } catch (err) {
    console.error(err);
    res.status(500).send(err.stack);
  }
});

module.exports = router;
