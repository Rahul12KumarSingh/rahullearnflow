const passport = require("passport");
const mongoose = require("mongoose");

const User = mongoose.model("users");
require("dotenv").config();

const GoogleStrategy = require("passport-google-oauth20").Strategy;


console.log("google auth id : " , process.env.clientID);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.clientID , 
      clientSecret: process.env.clientSecret , 
      callbackURL: "/auth/google/callback",
    },

    async (accessToken, refreshToken, profile, done) =>
    {
      console.log("user profile: ", profile);

      const newUser = {
        googleId: profile.id,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        displayName: profile.displayName,
        email: profile.emails[0].value,
        image: profile.photos[0].value,
      };

      try {
        let user = await User.findOne({ email: newUser.email });
        if (user) {
          // User Exists
          console.log("EXISTS ", user);
          done(null, user);
          //calling the done function it will take two paramenter first one is error and second one userdetails...

        } else {
          // Sign Up for the first time
          user = await User.create(newUser);
          console.log("NEW ", user);
          done(null, user);
        }
      } catch (error) {
        console.log(error);
        done(error);
      }
    }
  )
);


// serializeUser: Determines what user data should be stored in the session.
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// deserializeUser: Retrieves full user information from the session data.
passport.deserializeUser(async (id, done) => {
  try {

    const user = await User.findById(id);
    done(null, user);

  } catch (error) {
    done(error);
  }
});
