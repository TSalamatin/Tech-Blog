const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const { withAuth } = require('../utils/auth')

//Get All Posts for Homepage
router.get('/', (req, res) => {
  Post.findAll({
    attributes: ['id', 'title', 'content', 'date_posted'],
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
          as: 'commenter',
          attributes: ['username']
          
        }
      }
    ]
  })
    .then(dbPostData => {

      const posts = dbPostData.map(post => {
        const postPlain = post.get({ plain: true });

        if (post.Comments) {

          postPlain.comments = post.Comments.map(comment => {
            const commentPlain = comment.get({ plain: true });
            console.log(commentPlain)
            commentPlain.commenterName = comment.commenter.username; // Access commenter's username
            return commentPlain;
          });
        }
        return postPlain;
      });



      res.render('homepage', { posts, loggedIn: req.session.loggedIn });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//Get All of YOUR Posts for Dashboard
router.get('/dashboard', (req, res) => {
  Post.findAll({
    attributes: ['id', 'title', 'content', 'date_posted'],
    include: [
      { model: User, attributes: ['username'] },
      {
        model: Comment,
        attributes: ['id', 'content', 'post_id', 'date_commented'],
        
        include: { model: User, 
         as: 'commenter', 
          attributes: ['username'] }
      },
    ],
    where: { user_id: req.session.user_id } // Update this line
  })
    .then(dbPostData => {
      const posts = dbPostData.map(post => post.get({ plain: true }));
      res.render('dashboard', { posts, loggedIn: req.session.loggedIn });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


// Login route
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/')
    return;
  }
  res.render('login')
})



module.exports = router;
