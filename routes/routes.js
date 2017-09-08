import express from 'express';
const router = express.Router();

import User from '../models/user';
import passport from '../auth/github';

router.get('/', (req, res) => {
    res.render('index', { user: req.user });
});

router.get('/profile', (req, res) => {
    res.render('profile');
});

router.get('/:user/submit', (req, res) => {
    const usr = req.params.user;

    User.findOne({ name: usr }, (err, user) => {
        if (err) {
            req.flash('error', 'A server side error occured. Please try again in a few minutes.')
            res.render('index', { failure: req.flash('error') })
        } else if (!user || usr !== user.name) {
            req.flash('404', 'User ' + usr + ' could not be found')
            res.render('index', { failure: req.flash('404') })
        }  else {
            res.render('submit', { user });
        }
    })
})

router.post('/:user/submit', (req, res) => {
    const usr = req.params.user;
    const comment = req.body.comment;

    User.findOne({ name: usr }, (err, user) => {
        if (err) {
            req.flash('error', 'A server side error occured. Please try again in a few minutes.')
            res.render('index', { failure: req.flash('error') })
        } else if (!user || usr !== user.name) {
            req.flash('404', 'User could not be found')
            res.render('index', { failure: req.flash('404') })
        } else {
            user.comments.push({ comment, createdAt: Date.now() });
            user.save()
            .then((user) => {
                req.flash('commentSent', 'You have submitted a comment')
                res.render('Submit', { user, success: req.flash('commentSent')});
            });
        }
    })
});

router.get('/profile/comments', (req, res) => {
    const user = req.user;

    if(!user) {
        req.flash('notLoggedIn', 'You are not logged in. Please log in to view your comments.')
        res.render('index', {failure: req.flash('notLoggedIn')});
    } else {
        res.render('comments', { user, comments: user.comments.reverse()});
    }
});

router.get('/login', (req, res) => {
    res.send('Go back and register!');
});

router.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    function (req, res) {
        res.redirect('/');
    });

export default router;