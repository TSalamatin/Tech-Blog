const router = require('express').Router();
const { Blog, Comment } = require('../models');



// GET Blog 
router.get('/blog/:id', async (req, res) => {
  try {
    const dbBlogData = await Blog.findByPk(req.params.id, {
      include: [{
        model: Comment,
        attributes: [
          'post_title',
          'contents',
          'user_name',
          'date_posted'
        ]
      }]
    });

    const blogData = dbBlogData.get({ plain: true });
    res.status(200).json(blogData)
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//Get All Blogs
router.get('/', async (req, res) => {
  try {
    const dbBlogData = await Blog.findAll({
      include: [{
        model: Comment,
        attributes: [
          'post_title',
          'contents',
          'user_name',
          'date_posted'
        ]
      }]
    })
    res.status(200).json(dbBlogData)
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})


// Login route
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

module.exports = router;
