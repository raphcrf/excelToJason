const express = require('express')
const app = express()
const fetch = require('node-fetch')
const xlsxtojson = require("xlsx-to-json");
const xlstojson = require("xls-to-json");
const faker = require('faker')
const bodyParser = require('body-parser')
const expressLayouts = require('express-ejs-layouts')


app.set('view engine', 'ejs')    // Setamos que nossa engine será o ejs
app.use(expressLayouts)          // Definimos que vamos utilizar o express-ejs-layouts na nossa aplicação
app.use(bodyParser.urlencoded()) // Com essa configuração, vamos conseguir parsear o corpo das requisições
app.use(function(req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Max-Age", "3600");
    res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    next();
});
// configuration
app.use(express.static(__dirname + '/public'));               
app.use('/public/uploads',express.static(__dirname + '/public/uploads'));      
app.get('/', function (req, res) {
  res.send('Hello World')
})
app.get('/api/xlstojson', function(req, res) {
    xlsxtojson({
        input: "./contracts.xlsx",  // input xls
        output: "output.json", // output json
        lowerCaseHeaders:true
    }, function(err, result) {
        if(err) {
          res.json(err);
        } else {
          res.json(result);
          
          
          
        }
        
    });
    
});

// app.get('/cm',(req, res)=>{
//   let apiUrl = 'http://localhost:3000/api/xlstojson'

//   fetch(apiUrl)
//   .then(res =>{console.log(res.headers)})
//   .then(data=>{
//     console.log(data)
//   })
//   .catch(err=>{
//     res.send('/Error!')
//   })

// })


app.get('/cm', (req, res, next) => {
let apiUrl = 'http://localhost:3000/api/xlstojson'

  fetch(apiUrl)
  .then(res => res.json())
  .then(data => res.render('pages/home.ejs',{data : data}))
  .catch(err => {
    console.log(err);
    res.sendStatus(500); // Make sure you close the connection on an error!
  })
});


app.listen(3000)