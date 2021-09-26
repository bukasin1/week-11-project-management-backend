import passport from "passport";
const GoogleStrategy = require("passport-google-oauth20");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GoogleClientID,
      clientSecret: process.env.GoogleClientSecret,
      callbackURL: "/auth/google/redirect",
    }
    // () => {}
  )
  // () => {}
);

// export default passport;
