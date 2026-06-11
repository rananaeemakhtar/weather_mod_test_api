const express = require('express');
const { weatherRequest } = require('./src/validators/weather.validator');
const validate = require('./src/middlewares/validator');
const { transform } = require('./src/transformers/weatherResource');
const cors = require('cors');
require('dotenv').config();


const app = express();
const router = express.Router();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);
app.use(express.json());
app.use(router);

router.get('/api/weather', weatherRequest, validate, async (req, res) => {
        try {
            // validate input
            // call weather api
            // transform response

            const weatherResponse = await fetch(`${process.env.WEATHER_API_URL}?key=${process.env.WEATHER_API_KEY}&q=${req.query.city}`);
            const weatherData = await weatherResponse.json();
            const transformedData = transform(weatherData);

            // if city is not found, WeatherAPI returns a 200 status with an error 
            // object in the response, having all values null.
            if(!transformedData.city) {
                return res.status(404).json({
                    success: false,
                    message: 'City not found'
                });
            }

            res.json({
                success: true,
                data: transformedData
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'An error occurred while fetching weather data',
                error: error.message
            });
        }

    }
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});