var express = require("express");
var app = express();
var compression = require('compression')
app.use(compression())
const path = require("path");
const bodyParser = require("body-parser");
const multer = require("multer");
const storage= multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null,__dirname+ "/uploads/") ;
    },
    filename:(req, file, cb)=>{
        cb(null,file.originalname) ;
    }
})
const upload= multer({storage : storage})
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/coin-draft", { useNewUrlParser: true });
app.use(express.static(__dirname) );
app.use("/api", bodyParser.json());
let router = express.Router();
app.use("/api", router);

app.post("/api/file/upload" , upload.single('imageFile') , (req,res) =>{
    res.json({filename: "/uploads/"+req.file.originalname})
})
require("../server-controllers/user-controller")(router)
require("../server-controllers/vote-controller")(router)
require("../server-controllers/crypto-controller")(router)
app.get("*",(req, res, next) => {
    res.sendFile(__dirname + "/index.html");
});



var server = app.listen(process.env.PORT || 3000, function () {
    var port = server.address().port;

    console.log('Listening at http://localhost:%s', port);
});
// const request =require('request')
//
// const io = require('socket.io')(server);
// io.on('connection', async function(socket){
//     console.log('an user connected');
//     setInterval(()=>{
//         var uuu ='https://api.coindesk.com/v1/bpi/historical/close.json?start=2019-04-06&end=2019-04-13';
//
//         request(uuu, function (error, response, body) {
//             console.log('error:', error); // Print the error if one occurred
//             console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//             // console.log('body:', body); // Print the HTML for the Google homepage.
//             io.emit('test', {body});
//
//         });
//         // io.emit('test', { will: 'be received by everyone'});
//     },2000)
//     socket.on('disconnect', function(){
//         console.log('user disconnected');
//     });
// });