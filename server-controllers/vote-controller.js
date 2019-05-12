
var Vote = require('../dao/vote-dao')
var VoteStat = require('../dao/vote-stat-dao')
module.exports=(app)=>{
    app.get(`/vote/:id`,(req, res)=>{
        let  id =req.params.id ;
        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        // var ip = Math.floor(Math.random()*1000 +1);
        console.log(ip)

        try{
            Vote.findOne({coinId : id , userIp : ip },(err ,item)=>{
                if(item){
                    Vote.findOneAndDelete({coinId :id },(err,doc)=>{
                        console.log(doc)
                        VoteStat.findOneAndUpdate({ coinId : id },{$inc:{ count : -1}},{upsert:true},(err, doc)=>{
                            console.log(doc)
                            return res.status(200).end();

                        })
                    })
                }else{
                    let v = new Vote({
                        userIp : ip ,
                        coinId : id
                    })

                    v.save(err =>{
                        console.log(err)
                        VoteStat.findOneAndUpdate({ coinId : id },{$inc:{ count : 1}},{returnOriginal: false,upsert:true},(err, doc)=>{
                            console.log(doc)
                        })
                        // return res.status(200).end();
                    })
                }
            })
        }catch(e){
            return res.status(200).end();
            console.log("errrrorr")
        }


    })
}