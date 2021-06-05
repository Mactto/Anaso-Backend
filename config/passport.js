const passport = require('passport');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const {User} = require('../models/User');

module.exports = () => {
    // 로컬 로그인 전략
    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        }, function (email, password, done) {
            return User.findOne({email: email}, (err, user) => {
                if (!user) 
                    return done(null, false, {loginSuccess: false, message: "일치하는 이메일이 없습니다."})
         
                user.comparePasword(password, (err, isMatch) => {
                    if (!isMatch) 
                        return done(null, false, {loginSuccess: false, message: "비밀번호가 일치하지 않습니다."})
                          
                    return done(null, user, {loginSuccess: true, message: "성공적으로 로그인 되었습니다."})
                })
            })
        }
    ));

    // JWT 인증 전략
    passport.use(new JWTStrategy({
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET
        }, function(jwtPayload, done) {
            return User.findOne(jwtPayload.id)
            .then(user => {
                return done(null, user);
            })
            .catch(err => {
                return done(err);
            });
        }
    ));
}