const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const connectRedis = require('connect-redis');
const bodyParser = require('body-parser');

const db = require('./prototype/mongodb');
// const history = require('connect-history-api-fallback');
const config = require('./config');
const router = require('./routes/index');

const app = express();

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('X-Powered-By', '3.2.1');
  if (req.method === 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
});

const RedisStore = connectRedis(session);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({}));
app.use(cookieParser());
app.use(session({
  name: 'vanmaanen-session',
  secret: 'VanMaanen',
  resave: true,
  saveUninitialized: false,
  store: new RedisStore({
    url: config.sessionStorageURL,
  }),
}));
router(app);

// app.use(history());
console.log('*********************************');
console.log(`service start on ${config.port}`);
console.log('*********************************');
app.listen(config.port);

module.exports = app;
