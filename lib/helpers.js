isVerified = function(user) {
    return !user.emails || user.emails[0].verified;
};