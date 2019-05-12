var mongoose= require("mongoose") ;

module.exports= mongoose.model("VoteDao",{
    userIp :String,
    coinId : String,
    voted : {type :Boolean , default :true}
},"vote")