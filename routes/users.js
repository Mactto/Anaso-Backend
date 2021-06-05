const express = require('express');
const router = express.Router();
const {User} = require('../models/User');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const multer = require('multer');
const { json } = require('express');
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
})
const upload = multer({ storage: storage })

router.post('/uploadProfileImage', upload.single("profileImage"), function(req, res) {
  return res.status(200).json({
    message: "이미지 업로드 성공",
    filePath: res.req.file.path, 
    fileName: res.req.file.filename
  })
})

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
        return res.json({token});
    });
}) (req, res);
})

router.post("/signup", function(req, res) {
  let user = new User(req.body);

  
  user.save(function(err, doc) {
    if(err) return res.json({ success: false, message: "해당 이메일의 사용자가 이미 존재합니다."});
    
    return res.status(200).json({
      success:true,
      body: req.body
    });
  });
});

router.delete('/deleteUser', passport.authenticate('jwt', {session: false}), function(req, res) {
  User.findOneAndDelete({'_id': req.user._id}, function(err, result) {
    if (err) return res.json({ success: false, message: "유저를 삭제하는데 실패했습니다."});
    return res.status(200).json({
      success: true,
      message: "정상적으로 유저가 삭제되었습니다."
    });
  });
});

router.put('/updateUser', passport.authenticate('jwt', {session: false}), function(req, res) {
  User.findOneAndUpdate({'_id': req.user._id}, req.body , function(err, result) {
    if (err) return res.json({ success: false, message: "유저를 업데이트 하는데 실패했습니다."});
    return res.status(200).json({
      success:true,
      message: "성공적으로 유저 정보가 업데이트 되었습니다."
    })
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
