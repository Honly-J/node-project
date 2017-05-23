/**
 * Created by jianghonglin on 2017/5/17.
 */
var mongoose = require("mongoose");

var UserSchema = require("../schemas/user");
var userModel =  mongoose.model("User",UserSchema);

module.exports = userModel;