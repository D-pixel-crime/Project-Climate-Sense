import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import morgan from "morgan";

const app = express();
const port = 1020;
const apiKey = "";

app.use(express.static("public"));
app.use(morgan("short"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    try {
        res.render("index.ejs");
    } catch (error) {
        console.log(error.message);
    }
});

app.post("/weather-details", async (req, res) => {
    var cityName = (req.body.search).trim();
    cityName = cityName.replace(/\s/g, "+");
    try {
        var response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`);
        var weatherDetails = await response.data;
        res.render("index.ejs", {
            city_name: `${weatherDetails.name}, ${weatherDetails.sys.country}`,
            temp: weatherDetails.main.temp,
            min_temp: weatherDetails.main.temp_min,
            max_temp: weatherDetails.main.temp_max,
            feels_like: weatherDetails.main.feels_like,
            pressure: weatherDetails.main.pressure,
            humidity: weatherDetails.main.humidity,
            id: weatherDetails.weather.id,
            weather_condition: weatherDetails.weather[0].main,
            condition_description: weatherDetails.weather[0].description,
            icon: weatherDetails.weather[0].icon,
            windSpeed: ((weatherDetails.wind.speed) * (18 / 5)).toFixed(2),
            visibility: ((weatherDetails.visibility) / 1000)
        });
    } catch (error) {
        console.log(error.message);
        res.render("index.ejs", { error: `Incorrect parameter entered.` });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});