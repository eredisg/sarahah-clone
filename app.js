import express from 'express';
import exphbs from 'express-handlebars';
import session from 'express-session';
import passport from 'passport';
import config from 'config';
import router from './routes/routes';
import mongoose from 'mongoose';


const app = express();

mongoose.connect(config.database.uri);

app.engine('hbs', exphbs({extname: '.hbs', defaultLayout: '_layout'}));
app.set('view engine', 'hbs');

app.use(express.static('public'));
app.use(session({
    secret: config.session.secret,
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', router);

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

app.listen(3000, () => console.log("Running on port 3000"));
