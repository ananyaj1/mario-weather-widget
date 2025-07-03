require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors'); 

const PORT = 5001;

const app = express();
app.use(express.json());

// while in dev mode only 
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.get('/current-weather', async(req, res) => {
    const { lat, long } = req.query;

    console.log(lat);
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
            params: {
                appid: process.env.OPEN_WEATHER_ACCESS_KEY,
                lat: lat,
                lon: long,
                units: 'imperial'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error hitting Open Weather:', error.message);
        res.status(500).json({error: 'Failed to fetch weather data'});
    }
});

app.listen(PORT, () => { 
    console.log(`Server running on http://localhost:${PORT}`);
});