const router = require('express').Router();
const { Post, Comment } = require('../models');



// GET Post, and all it comments with the Users attached
router.get('/post/:id', (req, res) => {
  Post.findOne({
          where: {
              id: req.params.id
          },
          attributes: [
              'id',
              'content',
              'title',
              'date_posted'
          ],
          include: [{
                  model: Comment,
                  attributes: ['id', 'content', 'post_id', 'user_id', 'date_commented'],
                  include: {
                      model: User,
                      attributes: ['username']
                  }
              },
              {
                  model: User,
                  attributes: ['username']
              }
          ]
      })
      .then(dbPostData => {
          if (!dbPostData) {
              res.status(404).json({ message: 'No post found with this id' });
              return;
          }

          const post = dbPostData.get({ plain: true });
         
          res.render('single-post', { post, loggedIn: req.session.loggedIn });
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      })
    })

//Get All Posts
router.get('/', (req, res) => {
  Post.findAll({
          attributes: [
              'id',
              'title',
              'content',
              'created_at'
          ],
          include: [{
                  model: Comment,
                  attributes: ['id', 'content', 'post_id', 'user_id', 'dated_commented'],
                  include: {
                      model: User,
                      attributes: ['username']
                  }
              },
              {
                  model: User,
                  attributes: ['username']
              }
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
