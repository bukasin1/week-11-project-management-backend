import passport from "passport";
import strategy from "passport-facebook";

import User from "../models/userschema";

export interface userType {
  _id?: string,
  firstname?: string,
  lastname?: string,
  email?: string,
  password?: string,
  gender?: string,
  location?: string,
  facebookId?: string
}

const FacebookStrategy = strategy.Strategy;

passport.serializeUser(function(user: userType, done) {
  done(null, user);
});

passport.deserializeUser(function(user: userType, done) {
  done(null, user);
});

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
    }
  )
);
