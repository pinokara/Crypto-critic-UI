var mongoose= require("mongoose") ;

module.exports= mongoose.model("UserDao",{
    username: String,
    password: String,
    name: String,
    verified : {type : Boolean , default : false},
    created: {type: Date, default: Date.now},
    isAdmin: {type : Boolean , default :false },
    type : {type  :Number , default:1 , min :1 }
},"user")