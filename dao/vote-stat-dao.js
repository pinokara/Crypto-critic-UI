var mongoose= require("mongoose") ;

module.exports= mongoose.model("VoteStatDao",{
    coinId : String,
    count : {type:Number ,min:0, default :0}
},"vote_stat")