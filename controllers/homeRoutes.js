const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Read "Homepage" to show all posts
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User }, { model: Comment }]
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

// Read the clicked "Post" page
router.get('/post/:id', async (req, res) => {
  try {
    console.log("Parameter ID:" + req.params.id);
    const postData = await Post.findByPk(req.params.id, {
      include: [{ model: User }, { model: Comment }]
    });

    const post = postData.get({ plain: true });

    res.render('post', {
      post,
      logged_in: req.session.logged_in
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
// Read logged-in user's "Dashboard" page
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged-in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }]
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      user,
      logged_in: true
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

// Read "Create a new post" page
router.get('/create/:id', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] },
    });

    const user = userData.get({ plain: true });

    res.render('create', {
      user,
      username: req.session.username,
      logged_in: true
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

// Read "Update a post" page
router.get('/update/:id', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const postData = await Post.findByPk(req.params.id, {
      include: [{ model: User }]
    });

    const post = postData.get({ plain: true });

    res.render('update', {
      post,
      username: req.session.username,
      logged_in: req.session.logged_in
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

// Read "Add a comment" page
router.get('/comment/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [{ model: User }]
    });

    const post = postData.get({ plain: true });

    res.render('comment', {
      post,
      user_id: req.session.user_id,
      username: req.session.username,
      logged_in: req.session.logged_in
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
