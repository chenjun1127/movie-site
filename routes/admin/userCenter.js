var express = require('express');
var router = express.Router();
var User = require('../../models/user');
var {requiredLogin,requiredAdmin} = require ('../middleware/auth');
var path = require('path');
var fs = require('fs');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var savePic = (req,res,next)=>{
    var posterData = req.files.uploadPic
    var filePath = posterData.path
    var originalFilename = posterData.originalFilename
    // console.log(posterData+'\n',filePath+'\n',originalFilename+'\n');
    if (originalFilename) {
        fs.readFile(filePath,(err,data)=>{
            var timestamp = Date.now()
            var type = posterData.type.split('/')[1]
            var headPic = timestamp + '.' + type
            var newPath = path.join(__dirname, '../../', '/public/uploads/' + headPic)
            // console.log(newPath)
            fs.writeFile(newPath,data,(err,data)=>{
                // console.log("数据写入成功！");
                req.headPic = headPic
                next();
            })
        })
    }else{
        next();
    }
}

router.get('/user/center',requiredLogin,(req,res)=>{
    var userId = req.query.userId;
    // console.log(userId)
    User.findById(userId,(err, user) => {
        res.render('userCenter', {
            title: '个人中心',
            user: user              
        });      
    })
})
router.post('/admin/user/info',multipartMiddleware,requiredLogin,savePic,(req,res)=>{
    var userObj = req.body.user;
    var headPic = req.headPic;
    var userId = userObj._id;
    // console.log("userObj", userObj)
    var _User; 
    User.findById(userId,(err,user)=>{
        console.log(user)
        _User = Object.assign(user,userObj);
        if(headPic){
            _User.img = headPic;
        }
        _User.firstSave = false;        
        _User.save((err, user) => {
            if (err) {
                console.log(err)
            } else {        
                res.redirect(`/status?return_url=/user/center?userId=${userId}&code=1&tips=保存成功`)
            }
        })
    })
})

module.exports = router;