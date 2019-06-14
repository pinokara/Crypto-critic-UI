

let uri='http://localhost:3001/coin/award';
const request =require('request')
module.exports=(app)=>{
    app.get('/get/tx/:txid' ,(req,res)=>{
        let txid = req.params.txid ;
        var uuu =`${uri}/tx/${txid}`;
        console.log(txid)
        request(uuu, function (error, response, body) {
            if(!body) return res.send(null)
            return res.send(JSON.parse(body))
        });
    })

    app.get('/get/block/:hash' ,(req,res) =>{
        let hash= req.params.hash ;
        let uuu = `${uri}/block/${hash}` ;
        request(uuu, function (error, response, body) {
            if(!body) return res.send(null)
            return res.send(JSON.parse(body))
        });
    })
    app.get('/get/block-height/:index' ,(req,res) =>{
        let index= req.params.index ;
        let uuu = `${uri}/block-height/${index}` ;
        request(uuu, function (error, response, body) {
            if(!body) return res.send(null)
            return res.send(JSON.parse(body))
        });
    })
}