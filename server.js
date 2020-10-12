require('dotenv').config();
const fs = require('fs')
var html = fs.readFileSync('home.html','utf-8')
const requests = require('requests')
const port = process.env.PORT || 3000
    //fetch(`https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=${process.env.API}`)
    const replaceVal =(fake,{main,name,sys})=>{
        let temp = fake.replace('{%tempval%}',main.temp)
        temp = fake.replace('{%tempmin%}',main.temp_min)
        temp = fake.replace('{%tempmax%}',main.temp_max)
        temp = fake.replace('{%loc%}',name)
        temp = fake.replace('{%country%}',sys.country)
        temp = fake.replace('{%tempstatus%}',weather[0].main)
        return temp
    }
    const main=(req,res)=>{
        if(req.url=='/'){
            requests(`https://api.openweathermap.org/data/2.5/weather?q=Kolkata&units=metric&appid=${process.env.API}`, { streaming : true })
            .on('data', function (chunk) {
                const jsonData = JSON.parse(chunk)
                replaceVal(html,jsonData)
                console.log(jsonData)
            })
            .on('end', function (err) {
                if (err) return console.log('connection closed due to errors', err);
            });
        }
    }
    const server = require('http').createServer(main).listen(port,null,null,()=>{
        console.log("App running on port",port);
    })