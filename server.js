require('dotenv').config();
const requests = require('requests')
const port = process.env.PORT || 3000
    //fetch(`https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=${process.env.API}`)
    const main=(req,res)=>{
        if(req.url=='/'){
            requests(`https://api.openweathermap.org/data/2.5/weather?q=Kolkata&units=metric&appid=${process.env.API}`, { streaming : true })
            .on('data', function (chunk) {
                const jsonData = JSON.parse(chunk)
                console.log(jsonData.main.temp)
            })
            .on('end', function (err) {
                if (err) return console.log('connection closed due to errors', err);
            });
        }
    }
    const server = require('http').createServer(main).listen(port,null,null,()=>{
        console.log("App running on port",port);
    })