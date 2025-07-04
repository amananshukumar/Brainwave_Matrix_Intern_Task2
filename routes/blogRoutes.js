const express = require('express');
const Blog = require('../models/Blog');
const { ensureAuth } = require('../middleware/auth');
const router = express.Router();

router.get('/new', ensureAuth, (req, res) => res.render('blogs/new'));

router.post('/', ensureAuth, async (req, res) => {
  await Blog.create({ ...req.body, author: req.user._id });
  res.redirect('/');
});

router.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate('author');
  res.render('blogs/show', { blog });
});

router.get('/:id/edit', ensureAuth, async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog.author.equals(req.user._id)) return res.redirect('/');
  res.render('blogs/edit', { blog });
});

router.put('/:id', ensureAuth, async (req, res) => {
  await Blog.findByIdAndUpdate(req.params.id, req.body);
  res.redirect(`/blogs/${req.params.id}`);
});

router.delete('/:id', ensureAuth, async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

module.exports = router;
