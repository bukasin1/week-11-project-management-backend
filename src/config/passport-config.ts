import passport, { Profile } from 'passport';
import { IUser } from '../models/usermodeltest';
import express from 'express';

import user from '../models/usermodeltest';
const GoogleStrategy = require('passport-google-oauth20');

type User = {
  id?: string;
  userName?: string;
};
passport.serializeUser((user: User, done) => {
  done(null, user.id);
});

passport.deserializeUser((id: User, done) => {
  user.findById(id).then((user) => {
    done(null, user);
  });
});
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GoogleClientID,
      clientSecret: process.env.GoogleClientSecret,
      callbackURL: '/auth/google/redirect',
    },
    (accessToken: string, refreshToken: string, profile: Profile, done: any) => {
      console.log(profile);
      //check if user exists
      user.findOne({ googleId: profile.id }).then((existingUser) => {
        if (existingUser) {
          done(null, existingUser);
          console.log('user is:' + existingUser);
        } else {
          new user({
            userName: profile.displayName,
            googleId: profile.id,
          })
            .save()
            .then((newuser) => {
              done(null, newuser);
              console.log('new user created:' + newuser);
            });
        }
      });
    },
  ),
  // () => {}
);

// export default passport;
