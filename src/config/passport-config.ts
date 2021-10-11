/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
import passport, { Profile } from 'passport';
import { IUser } from '../models/userschema';
import strategy from 'passport-facebook';
import bcrypt from 'bcryptjs';

// import user from '../models/usermodeltest';
import User from '../models/userschema';

import localPassport from 'passport-local';

const LocalStrategy = localPassport.Strategy;

passport.use(
  new LocalStrategy({ usernameField: 'email' }, function (email, password, done) {
    console.log(email, password, 'local login');
    User.findOne({ email }, async function (err: any, user: IUser) {
      console.log(user, 'user login');
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      const validPassword = await bcrypt.compare(password, user.password as string);
      if (!validPassword) {
        return done(null, false);
      }
      return done(null, user);
    });
  }),
);

const GoogleStrategy = require('passport-google-oauth20');
const FacebookStrategy = strategy.Strategy;

export interface userProject {
  projectId?: string;
  projectName?: string;
}

export interface userType {
  firstname?: string;
  lastname?: string;
  email?: string;
  password?: string;
  gender?: string;
  role?: string;
  location?: string;
  projects?: Array<userProject>;
  teams?: string[];
  about?: string;
  isVerified?: boolean;
  avater?: string;
  resetpasswordtoken?: string;
  resetpasswordexpires?: string;
  facebookId?: string;
  googleId?: string;
}

type User = {
  id?: string;
  userName?: string;
};

passport.serializeUser(function (user: userType, done) {
  done(null, user);
});

passport.deserializeUser(function (user: userType, done) {
  done(null, user);
});

//Google passport strategy configured
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GoogleClientID,
      clientSecret: process.env.GoogleClientSecret,
      callbackURL: process.env.GoogleCallBackUrl,
    },
    (accessToken: string, refreshToken: string, profile: strategy.Profile, done: any) => {
      //check if user exists
      User.findOne({ googleId: profile.id }).then((existingUser: IUser) => {
        if (existingUser) {
          done(null, existingUser);
        } else {
          new User({
            email: profile._json.email,
            firstname: profile.name?.givenName,
            lastname: profile.name?.familyName,
            isVerified: true,
            googleId: profile.id,
          })
            .save()
            .then((newuser: IUser) => {
              done(null, newuser);
            })
            .catch((err: any) => {
              done(null, false);
            });
        }
      });
    },
  ),
);

//Facebook passport strategy configured
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL as string,
      enableProof: true,
      profileFields: ['email', 'name', 'displayName'],
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        const { id, email, first_name, last_name } = profile._json;
        const user = await User.findOne({ facebookId: id });
        if (user) return done(null, user);
        const userData = {
          email,
          firstname: first_name,
          lastname: last_name,
          isVerified: true,
          facebookId: id,
        };
        const newUser = new User(userData);
        const saveUser = await newUser.save();
        done(null, saveUser);
      } catch (err) {
        // console.log(err)
        done(null, false);
      }
    },
  ),
);
