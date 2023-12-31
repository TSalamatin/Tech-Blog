const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const { withAuth, TodayDate} = require('../../utils');



router.get('/', (req, res) => {
    Post.findAll({
        attributes: ['id',
            'title',
            'content',
            'date_posted'
        ],
        order: [
            ['date_posted', 'DESC']
        ],
        include: [{
            model: User,
            attributes: ['username']
        },
        {
            model: Comment,
            attributes: ['id', 'content', 'post_id', 'user_id', 'date_commented'],
            order: [
                ['date_posted', 'DESC']
            ],
            include: {
                model: User,
                attributes: ['username']
            }
        }
        ]
    })
        .then(dbPostData => res.json(dbPostData.reverse()))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });

});

router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'title', 'content', 'date_posted'],
        include: [
            {
                model: User,
                attributes: ['username', 'id']
            },
            {
                model: Comment,
                attributes: ['id', 'content', 'post_id', 'date_commented'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
        .then(dbPostData => {
           
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }

            const postPlain = dbPostData.get({ plain: true });
                console.log(postPlain)
            if (postPlain.comments) {
                postPlain.comments = postPlain.comments.map(comment => {
                    const commentPlain = comment.get({ plain: true });
                    return commentPlain;
                });
            }

            res.render('post', {
                post: postPlain,
                loggedIn: req.session.loggedIn,
                user_id: req.session.user_id,
                user_username: req.session.username
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


router.post('/', withAuth ,(req, res) => {
    console.log('Post Incoming')
    if (req.body.title && req.body.content) {
       const date = TodayDate()
        Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id,
            date_posted: date
        })
            .then(dbPostData => res.json(dbPostData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    } else {
        res.status(400)
    }
});

router.put('/:id', (req, res) => {
    Post.update({
        title: req.body.title,
        content: req.body.content
    }, {
        where: {
            id: req.params.id
        }
    }).then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(dbPostData);
    })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
router.delete('/:id', (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    }).then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(dbPostData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;