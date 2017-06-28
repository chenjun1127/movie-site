var express = require('express');
var router = express.Router();
var User = require('../../models/user');
// signIn
router.post('/user/signIn', (req, res) => {
    var _user = req.body.user;
    var name = _user.name;
    var password = _user.password;
    User.findOne({
        name: name
    }, (err, user) => {
        if (err) console.log(err);
        if (!user) {
            console.log('用户不存在');
            var msg = "用户不存在，去注册吧！"
            res.redirect(`/status?return_url=/signIn&code=0&tips=${msg}`)
        } else {
            console.log('用户存在:' + name, password)
                //  res.redirect('/')
            user.comparePassword(password, (err, isMatch) => {
                console.log(password,isMatch)
                if (err) console.log(err);
                if (isMatch) {
                    req.session.user = user;
                    res.redirect('/')
                    console.log('登录成功:Password is matched')
                } else {
                    console.log('登录失败:Password is not matched');
                    var msg ="登录失败，密码可能错误，请重新登录！"
                    res.redirect(`/status?return_url=/signIn&code=0&tips=${msg}`)
                }
            })
        }
    })
})

// signUp
router.post('/user/signUp', (req, res) => {
    var userObj = req.body.user;
    console.log("userObj",userObj)
    // 如果是已经注册过的，直接重定向到首页
    User.findOne({
        name: userObj.name
    }, (err, user) => {
        if (err) console.log(err);
        if (user) {
            var msg= "账号存在，去登录吧！"
            res.redirect(`/status?return_url=/signIn&code=0&tips=${msg}`)
        } else {
            var _user = new User(userObj);
            _user.firstSave = true;
            _user.save((err, user) => {
                if (err) {
                    console.log(err)
                }
                var msg= "注册成功，去登录吧！"
                res.redirect(`/status?return_url=/signIn&code=1&tips=${msg}`)
            })
        }
    })
})

// loginout
router.get('/loginout', (req, res) => {
    // console.log("1",req.session.user)
    // console.log("2",res.locals.user)
    delete req.session.user;
    delete res.locals.user;
    res.redirect('/');
})
router.get('/signIn', (req, res) => {
    res.render('signIn', {
        title: '登录'
    })
})
router.get('/signUp', (req, res) => {
    res.render('signUp', {
        title: '注册'
    })
})

module.exports = router;