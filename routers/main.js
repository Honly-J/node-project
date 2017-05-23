/**
 * Created by jianghonglin on 2017/5/18.
 */
var express = require('express');

var router = express.Router();

var UserModel = require("../models/user");

var cookieParser = require('cookie-parser');
var session = require('express-session');

router.get("/login?", function (req, res) {
    res.render("login", {
        title: "管理系统",
        errorMsg: ""
    })
});

router.post("/login", function (req, res) {
    var username = req.body.username;
    var pwd = req.body.password;
    UserModel.findOne({ user_name:username,password:pwd }, function (err, users) {
        if (err) {
            console.log(err)
        }
        //查询数据库
        if (username && pwd && users ) {
            //加入session
            console.log("登录成功");
            req.session.username = {"username":username}
            res.redirect("/admin");
        } else {
            res.render("login", {
                title: "登录 - 管理系统",
                errorMsg: "用户名或者密码错误"
            })
        }
    });
});

router.get("/admin/login-out", function (req, res) {
    req.session.username = null;
    res.render("login", {
        title: "管理系统",
        errorMsg: ""
    })
});


router.get("/admin", function (req, res) {
    res.render("index", {
        title: "登录 - 管理系统",
        desc: "欢迎来到xxx管理系统"
    })
});

module.exports = router ;
