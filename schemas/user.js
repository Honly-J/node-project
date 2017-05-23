/**
 * Created by jianghonglin on 2017/5/17.
 */
var Mongoose = require("mongoose");

var UserSchema = new Mongoose.Schema({
    user_name:{
        unique:true,
        type:String
    },
    password:String,
    author:{
        type:Number,
        default:0
    },
    create_time:{
        type:Date,
        default:Date.now()
    },
    update_time: {
        type: Date,
        default: Date.now()
    }
})


UserSchema.pre("save",function(next){
    if (this.isNew) {
        this.create_time = this.update_time = Date.now()
    }
    else {
        this.update_time = Date.now()
    }
    next()
})


UserSchema.statics = {
    fetch:function(cb){
        return  this.find({})
                    .sort("create_time")
                    .exec(cb);
    },
    findById:function(id,cb){
        return  this.find({_id:id})
                    .exec(cb);
    }
};

module.exports = UserSchema;