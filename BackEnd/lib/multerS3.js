module.exports = function () {
    var path = require('path');
    let AWS = require("aws-sdk");
    AWS.config.loadFromPath(__dirname + "/../config/awsconfig.json");
    let s3 = new AWS.S3();

    let multer = require("multer");
    let multerS3 = require('multer-s3');
    let upload = multer({
        storage: multerS3({
            s3: s3,
            bucket: "uitda.net",
            key: function (req, file, cb) {
                let extension = path.extname(file.originalname); // 확장자 명 추출
                let basename = path.basename(file.originalname, extension);
                cb(null, `${basename}-${Date.now()}${extension}`);
            },
            acl: 'public-read-write',
            contentType: multerS3.AUTO_CONTENT_TYPE
        })
    })

    return {
        s3: s3,
        upload: upload
    }
}