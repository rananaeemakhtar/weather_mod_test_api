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
            console.log(`Fetching weather data for city: ${req.query.city}`);
            const weatherResponse = await fetch(`${process.env.WEATHER_API_URL}?key=${process.env.WEATHER_API_KEY}&q=${req.query.city}`);
            const weatherData = await weatherResponse.json();

            // console.log('Raw weather data:', weatherData);
            // transform response
            const transformedData = transform(weatherData);

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