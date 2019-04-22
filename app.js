import express from 'express';
import db from './mongodb/db.js';
import router from './routes/index.js';
import cookieParser from 'cookie-parser'
import session from 'express-session';
import connectRedis from 'connect-redis';
import bodyParser from 'body-parser'
// import history from 'connect-history-api-fallback';
import config from './config'

const app = express();

app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", req.headers.origin || '*');
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("X-Powered-By", '3.2.1')
    if (req.method === 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }
});

const RedisStore = connectRedis(session);
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json({}));
app.use(cookieParser());
app.use(session({
    name: 'vanmannen-session',
    secret: 'VanMannen',
    resave: true,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 365 * 24 * 60 * 60 * 1000,
    },
    store: new RedisStore({
        url: config.sessionStorageURL
    })
}))
router(app);
// app.use(history());
console.log('*********************************')
console.log(`service start on ${config.port}`)
console.log('*********************************')
app.listen(config.port);

module.exports = app;
