
var fs = require('fs')
var http = require('http')
var bodyParser = require('body-parser')
var multer = require('multer')
var nStatic =  require('node-static')
var jsonfile = require('jsonfile')
var express = require('express')

var app = express()
var fileServer = new nStatic.Server('./public')


app.use(express.static('public'))
app.use(bodyParser.json())
app.engine('html', require('ejs').renderFile)
// app.set('views', path.join(__dirname), 'views'))
// app.set('view engine', 'html')


app.post('./addUser', function (req, res) {
    var imgUrl = req.body.imgUrl
    var name = req.body.name
    var price = req.body.price
    var retailPrice = req.body.retailPrice
    var discount = req.body.discount
    var dataNumber = req.body.dataNumber
    var obj = {
        data : [{
            imgUrl,
            name,
            price,
            retailPrice,
            discount,
            dataNumber
        }]
    }
    var ObjString = JSON.stringify(obj) 
    
    fs.writeFile('product.json', ObjString, 'utf8', function (err) {
        if (err) {
            console.log('An error occured while writing JSON Object to File."')
            return console.log(err)
        }
        console.log('JSON file has been saved.')
    })
})


http.createServer(function (req, res) {
    fileServer.serve(req, res);
}).listen(5000);
console.log('App running at localhost:5000')

// https://stackoverflow.com/questions/45237999/save-html-form-data-in-json-format-in-a-json-file-using-node-and-express-with-j
// https://stackoverflow.com/questions/43213085/node-js-how-to-write-input-values-of-a-formular-into-a-json-file-when-the-submi
// var newUser = {
//     "data" :
//     [{
//       "indexImgUrl":"./images/mob-1.jpeg",
//       "name":"Vivo V15 Pro (Topaz Blue, 128 GB)  (6 GB RAM)",
//       "price":"26,990",
//       "retailPrice":"32,990",
//       "discount": 18,
//       "dataNumber": 1
//     }]
// }

// var newUserObj = JSON.parse(newUser)
// console.log(newUserObj)

// var newUserContent = JSON.stringify(newUserObj)
// console.log(newUserContent)

// fs.writeFile('product.json', newUserContent, 'utf8', function (err) {
//     if (err) {
//         console.log('An error occured while writing JSON Object to File."')
//         return console.log(err)
//     }
//     console.log('JSON file has been saved.')
// })

// fs.readFile(file, (err, data) => {
    //         if (err && err.code === "ENOENT") {
    //             return fs.writeFile(file, ObjString, error => console.error)
    //         }
    //         else if (err) {
    //             console.error(err)
    //         }
    //         else {
    //             try {
    //                 const fileData = JSON.parse(data);
    //                 fileData.push(obj)
    //                 return fs.writeFile(file, JSON.stringify(fileData), error => console.error)
    //             } catch(exception) {
    //                 console.error(exception)
    //             }
    //         }
    //     })
    // })
    