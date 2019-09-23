
var express = require('express')
var app = express()
var fs = require('fs')
var bodyParser = require('body-parser')
var multer = require('multer')

app.use(express.static('public'))

var newUser = {
    "data" :
    [{
      "indexImgUrl":"./images/mob-1.jpeg",
      "name":"Vivo V15 Pro (Topaz Blue, 128 GB)  (6 GB RAM)",
      "price":"26,990",
      "retailPrice":"32,990",
      "discount": 18,
      "dataNumber": 1
    }]
}

var newUserObj = JSON.parse(newUser)
console.log(newUserObj)

var newUserContent = JSON.stringify(newUserObj)
console.log(newUserContent)

fs.writeFile('product.json', newUserContent, 'utf8', function (err) {
    if (err) {
        console.log('An error occured while writing JSON Object to File."')
        return console.log(err)
    }
    console.log('JSON file has been saved.')
})

var http = require('http')
var nStatic =  require('node-static')
var fileServer = new nStatic.Server('./public')

http.createServer(function (req, res) {
    fileServer.serve(req, res);
}).listen(5000);
console.log('App running at localhost:5000')