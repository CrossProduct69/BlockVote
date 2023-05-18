const passportLocal =  require("passport-local");
const passport = require("passport");
const loginService = require("../service/loginService");

const LocalStrategy = passportLocal.Strategy;

const initPassportLocal = () => {
    passport.use('local',new LocalStrategy({
            usernameField: 'email_address',
            passwordField: 'password',
            passReqToCallback: true
        },
        async (req,email_address, password, done) => {
            try {
                await loginService.findUserByEmail(email_address).then(async (user) => {
                    if (!user) {
                        return done(null, false, req.flash("error", `Email or password is incorrect`));
                    }
                    if (user) {
                        let match = await loginService.comparePassword(password, user);
                        if (match === true) {
                            return done(null, user, null)
                        } else {
                            return done(null, false, req.flash("error", match)
                            )
                        }
                    }
                });
            } catch (err) {
                console.log(err);
                return done(null, false, { message: err });
            }
        }));

};

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    loginService.findUserById(id).then((user) => {
        return done(null, user);
    }).catch(error => {
        return done(error, null)
    });
});

module.exports = initPassportLocal;