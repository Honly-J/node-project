/**
 * Created by jianghonglin on 2017/5/18.
 */
var express = require('express');
var router = express.Router();
var _ = require("underscore");
var UserModel = require("../models/user");

router.get("/", function (req, res) {
    UserModel.fetch(function (err, users) {
        if (err) {
            console.log(err);
        }
        res.render("user", {
            title: "用户管理",
            users: users
        })
    });

});
router.get("/add", function (req, res) {
    res.render("user-add", {
        title: "新增"
    })
});



router.get("/del/:id", function (req, res) {
    var _id = req.params.id;
    console.log(_id)
    if (_id) {
        UserModel.remove({_id:_id}, function (err, user) {
            if (err) {
                console.log(err);
                res.json({code:1,'msg':'删除错误'})
            }else{
                res.json({code:0,'msg':'删除成功'})
            }
        })
    } else {
        res.json({code:1,'msg':'缺少参数'})
    }
});


router.get("/edit/:id", function (req, res) {
    var _id = req.params.id;
    console.log(_id)
    if (_id) {
        UserModel.findById(_id, function (err, user) {
            if (err) {
                console.log(err)
            }
            res.render("user-edit", {
                title: "修改用户",
                user: user[0]
            })
        })
    } else {
        console.log("缺少id参数")
        res.redirect("/admin/user")
    }
});


router.post("/edit", function (req, res) {
    var user = req.body.user;
    if (user._id) {
        UserModel.findById(user._id, function (err, theUser) {
            if (err) {
                console.log(err)
            }
            var _user = _.extend(theUser[0], user);
            console.log(theUser, "theUser")
            console.log(user, "user")
            _user.save(function (err, __user) {
                if (err) {
                    console.log(err)
                }
                res.redirect('/admin/user')
            })
        })
    } else {
        res.redirect("/admin/user")
    }
});

router.post("/add", function (req, res) {
    UserModel.findOne({user_name: req.body.user.user_name}, function (err, one) {
        if (err) {
            console.log(err)
        }
        if (one) {
            console.log("用户名%s已存在", req.body.user.user_name);
            res.redirect("/admin/user")
        } else {
            var oUser = new UserModel(req.body.user);
            console.log(oUser, "******保存********")
            oUser.save(function (err, user) {
                if (err) {
                    console.log("err", err);
                }
                console.log('保存成功：' + user);
                res.redirect("/admin/user")
            });
        }
    });

});

module.exports = router;
