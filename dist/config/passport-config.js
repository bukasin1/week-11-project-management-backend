"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
const passport_1 = __importDefault(require("passport"));
const passport_facebook_1 = __importDefault(require("passport-facebook"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// import user from '../models/usermodeltest';
const userschema_1 = __importDefault(require("../models/userschema"));
const passport_local_1 = __importDefault(require("passport-local"));
const LocalStrategy = passport_local_1.default.Strategy;
passport_1.default.use(new LocalStrategy({ usernameField: 'email' }, function (email, password, done) {
    console.log(email, password, 'local login');
    userschema_1.default.findOne({ email }, async function (err, user) {
        console.log(user, 'user login');
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false);
        }
        const validPassword = await bcryptjs_1.default.compare(password, user.password);
        if (!validPassword) {
            return done(null, false);
        }
        return done(null, user);
    });
}));
const GoogleStrategy = require('passport-google-oauth20');
const FacebookStrategy = passport_facebook_1.default.Strategy;
passport_1.default.serializeUser(function (user, done) {
    done(null, user);
});
passport_1.default.deserializeUser(function (user, done) {
    done(null, user);
});
//Google passport strategy configured
passport_1.default.use(new GoogleStrategy({
    clientID: process.env.GoogleClientID,
    clientSecret: process.env.GoogleClientSecret,
    callbackURL: process.env.GoogleCallBackUrl,
}, (accessToken, refreshToken, profile, done) => {
    //check if user exists
    userschema_1.default.findOne({ googleId: profile.id }).then((existingUser) => {
        var _a, _b;
        if (existingUser) {
            done(null, existingUser);
        }
        else {
            new userschema_1.default({
                email: profile._json.email,
                firstname: (_a = profile.name) === null || _a === void 0 ? void 0 : _a.givenName,
                lastname: (_b = profile.name) === null || _b === void 0 ? void 0 : _b.familyName,
                isVerified: true,
                googleId: profile.id,
            })
                .save()
                .then((newuser) => {
                done(null, newuser);
            })
                .catch((err) => {
                done(null, false);
            });
        }
    });
}));
//Facebook passport strategy configured
passport_1.default.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    enableProof: true,
    profileFields: ['email', 'name', 'displayName'],
}, async function (accessToken, refreshToken, profile, done) {
    try {
        const { id, email, first_name, last_name } = profile._json;
        const user = await userschema_1.default.findOne({ facebookId: id });
        if (user)
            return done(null, user);
        const userData = {
            email,
            firstname: first_name,
            lastname: last_name,
            isVerified: true,
            facebookId: id,
        };
        const newUser = new userschema_1.default(userData);
        const saveUser = await newUser.save();
        done(null, saveUser);
    }
    catch (err) {
        // console.log(err)
        done(null, false);
    }
}));
//# sourceMappingURL=passport-config.js.map