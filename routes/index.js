var express = require('express');
var router = express.Router();
var User = require('../models/User');
var cookies = require('cookies');

//统一返回格式
var data;

router.use( function (req, res, next){
    data = {
        code: 0,
        message: ''
    };
    next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '首页', userInfo: req.userInfo});
});

//用户注册页面
router.get('/reg', function (req, res, next) {
   res.render('reg', { title: '用户注册'});
});

//用户注册功能
router.post('/reg', function(req, res){

  var username = req.body.username;
  var password = req.body.password;
  var repassword = req.body.repassword;

  //用户名不能为空
  if(username == ''){
      data.code = 1;
      data.message = '用户名不能为空';
      res.json(data);
      return;
  }

    //密码不能为空
    if(password == ''){
        data.code = 2;
        data.message = '密码不能为空';
        res.json(data);
        return;
    }

  //检查用户两次输入的密码是否一致
    if(password != repassword){
        data.code = 3;
        data.message = '两次输入的密码不一致';
        res.json(data);
        return;
    }

    User.findOne({
        username: req.body.username
    }).then(function (info) {
        if(info){
            data.code = 4;
            data.message = '用户名已经存在';
            res.json(data);
            return;
        }

        return new User({
            username: req.body.username,
            password: req.body.password
        }).save();
    }).then(function (newUser) {
        data.message = '注册成功';
        res.json(data);
    })
});


//用户登录页面
router.get('/login', function (req, res, next) {
    res.render('login', { title: '用户登录'});
});

//用户登录功能
router.post('/login', function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    if(username == '' || password == ''){
        data.code = 1;
        data.message = '用户名或密码不能为空';
        res.json(data);
        return;
    }

    User.findOne({
        username: username,
        password: password
    }).then(function (hasUser) {
        if(!hasUser){
            data.code = 2;
            data.message = '用户名或密码不正确';
            res.json(data);
            return;
        }
        data.message = '登录成功';
        data.userInfo = {
            id: hasUser._id,
            username: hasUser.username
        };
        req.cookies.set('userInfo', JSON.stringify({
            _id: hasUser._id,
            username: hasUser.username
        }));
        res.json(data);
        return;
    });
});

//用户登出
router.get('/logout', function (req, res) {
   req.cookies.set('userInfo', null);
   res.json(data);
});

module.exports = router;
