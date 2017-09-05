import passport from 'passport';
import config from 'config';
import {Strategy} from 'passport-github2';
const GitHubStrategy = Strategy;

import User from '../models/user';
import init from './init';

passport.use(new GitHubStrategy(config.auth.github, (accessToken, refreshToken, profile, done) => {
    const name = profile.username;
    const githubId = profile.id;

    User.findOneAndUpdate({name}, {name, githubId}, {upsert:true}, (err, user) => {
        if(err) {
            return done(err);
        } else {
            return done(null, user);
        }
    })
}
));

init();

export default passport;