const router = require('express').Router();
const { Post, Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');

// Route: /api/posts

// Create a post
router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete a post
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a post
router.put('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.update(
      {
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id
      },
      {
        where: {
          id: req.params.id,
        },
      });

    if (!postData) {
      res.status(404).json({ message: 'No post with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Read a post
router.get('/:id', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const postData = await Post.findByPk(req.params.id, {
      include: [{ model: User }]
    });

    if (!postData) {
      res.status(404).json({ message: 'No post with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Read all posts
router.get('/', async (req, res) => {
  try {
    // Get all posts and JOIN with user and comment
    const postData = await Post.findAll({
      include: [{ model: User }, { model: Comment }]
    });

    if (!postData) {
      res.status(404).json({ message: 'No post with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
