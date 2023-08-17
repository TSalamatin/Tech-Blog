const router = require('express').Router();
const { User } = require('../../models');

// GET All users
// This is mostly for API Check
router.get('/', async (req, res) => {
  try {
    const dbUserData = await User.findAll();

    res.status(200).json(dbUserData);
    ;
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET 1 users
// This is mostly for API Check
router.get('/:id', async (req, res) => {
  try {
    const dbUserData = await User.findByPk(req.params.id);

    res.status(200).json(dbUserData);
    ;
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// CREATE new user
router.post('/', async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.loggedIn = true;

      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// Login
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!dbUserData) {

      res.status(400).json({ message: 'Incorrect email or password. Please try again!' });

      return;
    } else if (!validPassword) {

      res.status(400).json({ message: 'Incorrect email or password. Please try again!' });

      return;
    } else {

      req.session.loggedIn = true;

      res.status(200).json({ user: dbUserData, message: 'You are now logged in!' });
    }

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;