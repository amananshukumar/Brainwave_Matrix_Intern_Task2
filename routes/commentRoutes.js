const express = require('express');
const Comment = require('../models/Comment');
const { ensureAuth } = require('../middleware/auth');
const router = express.Router({ mergeParams: true });

router.post('/', ensureAuth, async (req, res) => {
  await Comment.create({
    text: req.body.text,
    blog: req.params.id,
    author: req.user._id
  });
  res.redirect(`/blogs/${req.params.id}`);
});

module.exports = router;
