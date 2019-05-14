

const request =require('request')
module.exports=(app)=>{
    app.get('/market',(req,res)=>{
        var uuu ='https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=1h,24h,7d';
        request(uuu, function (error, response, body) {
            if(!body) return res.send(null)
            return res.send(JSON.parse(body))
        });
    })

    app.get('/clone/:id',(req,res)=>{
        // https://www.highcharts.com/samples/data/' + name.toLowerCase() + '-c.json
        request(`https://www.highcharts.com/samples/data/${req.params.id}-c.json` ,(err, resp, body)=>{
            if(!body) return res.send(null)
            return res.send(JSON.parse(body))
        })
    })
}