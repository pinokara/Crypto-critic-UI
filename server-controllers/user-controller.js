const UserDao = require("../dao/user-dao");
const _ = require("lodash");
const Security = require("../security/security-be");
const MailFeatures = require('./mail-controller').MailFeatures
const crypto = require("crypto")
module.exports = (app) => {

    app.get('/me', Security.authorDetails, (req, res) => {
        res.send(req.user);
    })
    app.post("/login", (req, res) => {
        if (_.isEmpty(req.body)) {
            res.status(400).end();
            return;
        }
        let {username, password} = req.body;
        UserDao.findOne({
            username :username,
            password: crypto.createHash('md5').update(password).digest("hex")
        }, {"password": 0}, (err, user) => {
            console.log(user)
            if (user == null) {
                return res.status(200).send({err: true, message: "Tài khoản không tồn tại!"})
            } else {
                res.send({
                    user: user,
                    token: Security.createSecurityToken(user.toJSON())
                })
            }
        })
    })

    app.post("/register", (req, res) => {
        const {username, password, re_password} = req.body;
        console.log(req.body)
        try{
            UserDao.findOne({username: username}, (err, item) => {
                if (err) {
                    return res.status(200).send({error: true, message: "Somthing's wrong"});
                }
                if(item){
                    return res.status(200).send({error: true, message: "Account has been taken"});
                }else{
                    console.log(crypto.createHash('md5').update(password).digest("hex"));
                    let newU =  new UserDao({ username : username , password: crypto.createHash('md5').update(password).digest("hex")}) ;
                    newU.save(err =>{
                        if(err) return res.status(200).send({error: true, message: "Somthing's wrong"});
                        var host ='http://localhost:5000/api/verify?token='+ Security.createSecurityToken({username : username});
                        console.log(host)
                        console.log(host.length)
                        MailFeatures.sendMail({
                            from :'Crypto-Critic <test@galatium.org>',
                            to:username,
                            subject:'Acount Verify',
                            text :'Your register URL here !',
                            html : '<div><a target="_blank" href="'+host+'">URL !</a></div>'
                        }).then(data =>{
                            if(data.error) return res.status(200).send({error: true, message: "Somthing's wrong"});
                            return res.status(200).send({error: false, message: "Access your email to verify this account !"});
                        });
                    })
                }

            })
        }catch (e){
            console.log(e)
        }

    })

    app.get('/verify', (req,res) =>{
        const {token} =req.query ;
        Security.verifyToken(token).then(deTok =>{
            if(!deTok) return res.send("Something's wrong !") ;
            UserDao.findOne({username : deTok.username},{'password' :0,'_id':0 },(err, u) =>{
                console.log(u)
                if(u && u.verified==false){
                    UserDao.findOneAndUpdate({ username : u.username },{'verified': true},{new:true,upsert:true},(err, doc) =>{
                        if(err) return res.send({error : true,  message :'Failed !'})
                        else return res.status(200).end();
                    })
                }else{
                    return res.status(200).end();
                }

            })
        }) ;

        // res.send(token)
    })
}