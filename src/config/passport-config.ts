import passport, { Profile } from 'passport';
import { IUser } from '../models/usermodeltest';
import express from 'express';
import strategy from "passport-facebook";

// import user from '../models/usermodeltest';
import User from "../models/userschema";

const GoogleStrategy = require('passport-google-oauth20');
const FacebookStrategy = strategy.Strategy;

export interface userType {
  _id?: string,
  firstname?: string,
  lastname?: string,
  email?: string,
  password?: string,
  gender?: string,
  location?: string,
  facebookId?: string,
  googleId?: string
}


type User = {
  id?: string;
  userName?: string;
};


passport.serializeUser(function(user: userType, done) {
  done(null, user);
});

passport.deserializeUser(function(user: userType, done) {
  done(null, user);
});

//Google passport strategy configured
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GoogleClientID,
      clientSecret: process.env.GoogleClientSecret,
      callbackURL: '/auth/google/redirect',
    },
    (accessToken: string, refreshToken: string, profile: strategy.Profile, done: any) => {
      console.log(profile);
      //check if user exists
      User.findOne({ googleId: profile.id }).then((existingUser) => {
        if (existingUser) {
          done(null, existingUser);
          console.log('user is:' + existingUser);
        } else {
          new User({
            email: profile._json.email,
            firstname: profile.name?.givenName,
            lastname: profile.name?.familyName,
            isVerified: true,
            googleId: profile.id,
          })
            .save()
            .then((newuser) => {
              done(null, newuser);
              console.log('new user created:' + newuser);
            })
            .catch((err) => {
              done(null, "Non")
            });
        }
      });
    },
  ),
  // () => {}
);

//Facebook passport strategy configured
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL as string,
      enableProof: true,
      profileFields: ["email", "name", "displayName"]
    },
    async function(accessToken, refreshToken, profile, done) {
      try{
        const { id, email, first_name, last_name } = profile._json;
        const user = await User.findOne({facebookId: id})
        if(user) return done(null, user);
        const userData = {
          email,
          firstname: first_name,
          lastname: last_name,
          isVerified: true,
          facebookId: id
        };
        const newUser = new User(userData)
        const saveUser = await newUser.save();
        done(null, saveUser);
      }catch(err){
        // console.log(err)
        done(null, "Non")
      }
    }
  )
);

// export default passport;
