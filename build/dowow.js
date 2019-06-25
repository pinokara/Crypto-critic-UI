const download = require('image-downloader')
const path = require('path')
const fs = require('fs');

async function downloadIMG() {
    try {
        const {filename, image} = await download.image(options)
        console.log(filename) // => /path/to/dest/image.jpg
    } catch (e) {
        console.error(e)
    }
}

const downdown = (options) => new Promise((res, rej) => {
    download.image(options).then(data => {
        res(data)
    })

})
let request = require('request')
request('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h' ,(err, res, body)=>{
    let paserData = JSON.parse(body);
    console.log(paserData[2])
    for(let i =0 ; i< paserData.length ;i++){
        let options ={
            url: paserData[i].image,
            dest: path.join(__dirname, `./coins/${paserData[i].id}.png`)
        }
        downdown(options)
    }
})

// request('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h', (err, res, body) => {
//     let paserData = JSON.parse(body);
//     let items = paserData.map((o, i) => ({id: o.id, name: o.name, symbol: o.symbol, image: o.id + '.png'}))
//     console.log(items)
//     let jsonContent =  JSON.stringify(items)
//     fs.writeFile("output.json", jsonContent, 'utf8', function (err) {
//         if (err) {
//             console.log("An error occured while writing JSON Object to File.");
//             return console.log(err);
//         }
//
//         console.log("JSON file has been saved.");
//     });
// })

