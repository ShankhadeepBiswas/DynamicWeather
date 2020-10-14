require('dotenv').config();
const prompt = require('prompt')
const schema ={
    properties: {
        name: {
          pattern: /^[a-zA-Z\s\-]+$/,
          message: 'It must be a city name',
          required: true
        }
      }
}
const fs = require('fs')
var html = fs.readFileSync('home.html','utf-8')
const requests = require('requests')
const port = process.env.PORT || 3000
    const replaceVal =(fake,{main,name,sys,weather})=>{
        let temp = fake.replace(/{%tempval%}/,main.temp)
        temp = temp.replace(/{%tempmin%}/,main.temp_min)
        temp = temp.replace(/{%tempmax%}/,main.temp_max)
        temp = temp.replace(/{%loc%}/,name)
        temp = temp.replace(/{%country%}/,sys.country)
        temp = temp.replace(/{%tempstatus%}/,weather[0].main)
        temp = temp.replace(/{%weather%}/,weather[0].description)
        return temp
    }
    const main=(req,res)=>{
        if(req.url=='/'){
//             var loc;
//             prompt.start();
//             prompt.get(schema, function (err, result) {
//                 loc = result.name
//              console.log('Command-line input received:');
//              console.log('city-name:' + result.name);
//   })
            requests(`https://api.openweathermap.org/data/2.5/weather?q=Kolkata&units=metric&appid=${process.env.API}`, { streaming : true })
            .on('data', function (chunk) {
                const jsonData = JSON.parse(chunk)
                // console.log(replaceVal(html,jsonData));
                res.write(replaceVal(html,jsonData))
                res.end();
            })
            .on('end', function (err) {
                if (err) return console.log('connection closed due to errors', err);
            });
        }
    }
    const server = require('http').createServer(main).listen(port,null,null,()=>{
        console.log("App running on port",port);
    })