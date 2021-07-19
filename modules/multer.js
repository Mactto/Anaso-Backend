const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
aws.config.loadFromPath(__dirname + '/../config/s3.json');

// s3
const s3 = new aws.S3();
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'anaso',
        acl: 'public-read',
        key: function(req, file, cb) {
            cb(null, Date.now() + '.' + file.originalname.split('.').pop());
        }
    })
}, 'NONE');

//disk
// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//       cb(null, 'uploads/');
//     },
//     filename: function(req, file, cb) {
//       cb(null, `${Date.now()}_${file.originalname}`);
//     }
//   })
// const upload = multer({ storage: storage })

module.exports = upload;