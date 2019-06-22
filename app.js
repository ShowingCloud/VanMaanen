const Express = require('express');
const Passport = require('passport');
const Session = require('express-session');
const RedisStore = require('connect-redis')(Session);
const OIDCStrategy = require('passport-openidconnect').Strategy;

require('./models/mongodb');
const config = require('./config/config');
const router = require('./routes');


Passport.use(new OIDCStrategy({
  clientID: config.oidcClientId,
  clientSecret: config.oidcClientSecret,
  authorizationURL: 'https://sso.scs.im/oidc/auth',
  tokenURL: 'https://sso.scs.im/oidc/token',
  callbackURL: 'http://lumi.scs.im/auth/sso/callback',
},
(token, tokenSecret, profile, done) => done(null, profile)));

Passport.serializeUser((profile, done) => {
  done(null, profile);
});

Passport.deserializeUser((profile, done) => {
  done(null, profile);
});


const app = Express();

app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');

app.use(require('helmet')());
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')(config.sessionSecret));
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('body-parser').json());

app.enable('trust proxy');
app.use(Session({
  cookie: {
    secure: true,
  },
  resave: false,
  saveUninitialized: false,
  secret: [config.sessionSecret, ...config.otherSessionSecrets],
  store: new RedisStore({
    url: config.redisStorageURL,
    logErrors: true,
    prefix: config.redisSessionPrefix,
  }),
}));

app.use(Passport.initialize());
app.use(Passport.session());

router(app);


app.listen(config.port);
