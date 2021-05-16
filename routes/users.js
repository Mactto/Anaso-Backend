const express = require('express');
const router = express.Router();
const {User} = require('../models/User');
const passport = require('passport');
const jwt = require('jsonwebtoken');

router.get('/', function(req, res, next) {
  res.status(200)
});

router.post('/signin', function(req, res) {
  passport.authenticate('local', {session: false}, (err, user) => {
    if (err || !user) {
        return res.status(400).json({
            message: 'Something is not right',
            user: user,
        });
    }
    req.login(user, {session: false}, (err) => {
        if(err) {
            res.send(err);
        }
        const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET);
        return res.json({user, token});
    });
}) (req, res);
})

router.post("/signup", function(req, res) {
  let user = new User(req.body);

  user.save(function(err, doc) {
    if(err) return res.json({ success: false, message: "해당 이메일의 사용자가 이미 존재합니다."});
    return res.status(200).json({
      success:true
    });
  });
});

// JWT 인증 -> 반환값 : user 정보 (request 방법 -> Authenticate Bearer 토큰값)
router.get("/auth_user", passport.authenticate('jwt', {session: false}), async function(req, res, next) {
  try {
    res.json({result: true, user: req.user});
  } catch(err) {
    console.log(err);
    next(err);
  }
});

module.exports = router;
