var express = require("express");
var http = require("http");
var path = require("path");
var app = express();



var bodyParser = require('body-parser');

var cookieParser = require('cookie-parser');
var session = require('express-session');

var mongoose = require("mongoose");


app.set("views", "./views/page");
app.set("view engine", "jade");
//设置返回的页面数据 bodyparser设置
app.use(bodyParser.urlencoded({extended: true}));
//设置静态资源的路径
app.use(express.static(path.join(__dirname, "public")))


app.use(cookieParser());
app.use(session({
    resave: true, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: 'node-project'
}));

app.locals.moment = require('moment');

app.use(function(req,res,next) {
    if (req.session.username) {
        next();
    } else if (req.url == "/login") {
        next();
    } else {
        console.log("未登录");
        res.redirect("/login");
    }
})

//路由
app.use('/admin/user', require('./routers/user'));
app.use('/', require('./routers/main'));

//链接数据库
mongoose.connect("mongodb://localhost:27017/blog", function (err) {
    if (err) {
        console.log(err)
        console.log('数据库链接失败')
    } else {
        console.log("数据库链接成功")
    }
});

app.listen(3000, "localhost");
console.log("node app server start at port 3000");