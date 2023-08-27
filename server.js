const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const hbs = exphbs.create();
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const routes = require('./controllers');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;


const sess = {
  secret: 'Puppies are better than kittens',
  cookie: {
      maxAge: 60 * 60 * 1000,
      secure: false,
      httpOnly: true,

  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
      db: sequelize,
    }),
};


app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sess));
app.use(routes);

app.use('/public/js', express.static(path.join(__dirname, 'public/js'), { 
  setHeaders: (res, path) => {
    if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
  }
}));

sequelize.sync().then(() => {
  app.listen(PORT, () =>
    console.log(
      `\nServer running on port ${PORT}. Visit http://localhost:${PORT}`
    )
  );
});


