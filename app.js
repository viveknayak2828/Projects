const express = require('express')
const https = require('https')  //native module 
const bodyparser = require('body-parser')


const app = express();

app.use(bodyparser.urlencoded({extended:true}))    //to get acess to the data in html//cityname

app.get("/", function(req, res){
    res.sendFile(__dirname+"/index.html")    // input from user
} )

app.post("/", function(req,res){
    
    const query = req.body.cityname
    const apikey = "3165466fa2729bc4701b965d1ee1c836"
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+ apikey+"&units=metric"
    https.get(url, function(response){          //console.log(response.statusCode)   //200 for working   
        response.on('data', function(data){
        const weatherdata = JSON.parse(data)
        const temp = weatherdata.main.temp
        const weatherdesc = weatherdata.weather[0].description
        const icon = weatherdata.weather[0].icon
        const inconURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
        res.write("<h1>The temp is "+ temp+ " degree celsius</h1>")
        res.write("<p>The weather is "+ weatherdesc+"<p>")
        res.write("<img src = "+inconURL+">")
        res.send()
    })
    })
})




app.listen(3000, function(){    //to initiate server
    console.log("running")

} )



    