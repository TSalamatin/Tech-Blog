const router = require('express').Router();
const { User, Post , Comment } = require('../models');



//Get All Posts
router.get('/', (req, res) => {
  Post.findAll({
          attributes: [
              'id',
              'title',
              'content',
              'date_posted'
          ],
          include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                  model: Comment,
                  attributes: ['id', 'content', 'post_id', 'date_commented'],
                  include: {
                      model: User,
                      attributes: ['username']
                  }
              },
              
          ]
      })
      .then(dbPostData => {
          const posts = dbPostData.map(post => post.get({ plain: true }));
          res.render('homepage', { posts, loggedIn: req.session.loggedIn });
      })
      .catch(err => {
          console.log(err)
          res.status(500).json(err)
      })
})

// Login route
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/')
    return;
  }
  res.render('login')
})

// Signup Route
router.get('/signup', (req, res) => {
  res.render('signup')
})


module.exports = router;
