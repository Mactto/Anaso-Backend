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
            return User.findOne({email: email})
            .then(user => {
                if (!user) {
                    return done(null, false, {messgae: '이메일 혹은 비밀번호가 일치하지 않습니다.'});
                }
                return done(null, user, {message: '성공적으로 로그인 되었습니다.'});
            })
            .catch(err => done(err));
        }
    ));

    // JWT 인증 전략
    passport.use(new JWTStrategy({
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET
        }, function(jwtPayload, done) {
            return UserModel.findOneById(jwtPayload.id)
            .then(user => {
                return done(null, user);
            })
            .catch(err => {
                return done(err);
            });
        }
    ));
}