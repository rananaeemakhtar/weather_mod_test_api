const express = require('express');
const { weatherRequest } = require('./src/validators/weather.validator');
const validate = require('./src/middlewares/validator');
const transform = require('./src/transformers/weatherResource');
require('dotenv').config();

const app = express();
const router = express.Router();
const port = process.env.PORT || 3000;


app.use(express.json());
app.use(router);

router.post('/api/weather', weatherRequest, validate, async (req, res) => {
        try {
            // validate input
            // call weather api

            const weatherResponse = await fetch(`${process.env.WEATHER_API_URL}?key=${process.env.WEATHER_API_KEY}&q=${req.body.city}`);
            const weatherData = await weatherResponse.json();
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