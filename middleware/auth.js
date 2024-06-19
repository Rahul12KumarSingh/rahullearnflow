const ensureAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
};

//about the isAutheticated method...

//The req.isAuthenticated() method is part of the Passport.js authentication library, which is commonly used in Node.js applications to handle authentication. This method checks if the user making the request is authenticated.

//The req.isAuthenticated() method checks whether the request has a valid user session.


// It returns true if the user is authenticated (i.e., if the session contains valid user information) and false otherwise.

const ensureGuest = (req, res, next) => {
  if (req.isAuthenticated()) return res.redirect("/dashboard");
  next();
};

module.exports = {
  ensureAuth,
  ensureGuest,
};
