const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

router.get('/', async (req, res) => {
  const blogs = await Blog.find().populate('author');
  res.render('index', { title: 'Home', blogs });
});

module.exports = router;
