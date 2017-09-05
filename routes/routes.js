import express from 'express';
const router = express.Router();

import passport from '../auth/github';

router.get('/', (req, res, next) => {
    res.render('index', {user:req.user});
});

router.get('/profile', (req, res, next) => {
    res.render('profile');
});

router.get('/login', (req, res, next) => {
    res.send('Go back and register!');
  });

  router.get('/auth/github', passport.authenticate('github', { scope: [ 'user:email' ] }));
  
  router.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    function(req, res) {
      res.redirect('/');
    });

export default router;