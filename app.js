const { json } = require("express");
const express = require("express");
const https = require("node:https");
const { workerData } = require("node:worker_threads");
const bodyParser = require("body-parser");


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
});

app.post("/", (req, res) => {
    const query = req.body.cityName;
    const apiKey = "c49606c0c97a80906e137d941d6fce86#";
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + units + "&appid=" + apiKey;
    https.get(url, (response) => {//sending https request to the weather api server and get the response
        // console.log(response.statusCode);
        response.on("data", (data) => {//from the response we the data 
            const weatherData = JSON.parse(data);//we parse the data as a json format
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imgUrl = " http://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write(`<p>Its ${description} out there</p>`);
            res.write(`<h1>The temperature in ${query} is ${temp} degreee celsius</h1>`)
            res.write("<image src=" + imgUrl + ">");
            res.send();
        })
    })
})



app.listen(3000, () => {
    console.log("server listening at 3000");
})