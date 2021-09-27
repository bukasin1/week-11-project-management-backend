import passport from "passport";

export const getFacebookAuth = () => {
  return passport.authenticate("facebook", {scope: ['email'] })
}

export const authFacebook = () => {
  return passport.authenticate("facebook", {
    successRedirect: "/dashboard",
    failureRedirect: "/fail"
  })
}

