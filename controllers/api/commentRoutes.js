const router = require('express').Router();
const { Comment, Post, User } = require('../../models');
const withAuth = require('../../utils/auth');

// Route: /api/comments

// Create a comment
router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      text_area: req.body.acomment,
      user_id: req.session.user_id,
      post_id: req.session.post_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete a comment
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Read all comments
router.get('/', async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      include: [{ model: User }, { model: Post }]
    });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Read one comments
router.get('/:id', async (req, res) => {
  try {
    const commentData = await Comment.findByPk(req.params.id, {
      include: [{ model: User }, { model: Post }]
    });

    if (!commentData) {
      res.status(404).json({ message: 'No comment with this id!' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
