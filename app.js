var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var swig = require('swig');
var mongoose = require('mongoose');
var cookies = require('cookies');




var app = express();

app.engine('html', swig.renderFile);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
//在开发过程中，需要取消模板缓存
swig.setDefaults({cache: false});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



//添加用户cookies
app.use(function (req, res, next) {
   req.cookies = new cookies(req, res);

   req.userInfo = {};

   if(req.cookies.get('userInfo')){
       try {
           req.userInfo = JSON.parse(req.cookies.get('userInfo'));
           next();
       }catch (e){
           next();
       }
   }else{
       next();
   }
});


app.use('/users', require('./routes/users'));
app.use('/', require('./routes/index'));

mongoose.connect('mongodb://localhost:27018/microblog',function (err) {
    if(err){
        console.log('数据库连接失败');
    }else{
        console.log('数据库连接成功');
        app.listen(3000);
    }
});

