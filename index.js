const express = require('express');
const ns = require('./ns');
const path = require('path');
const cache = require('memory-cache');

const cacheDuration = 60 * 1000; // cache duration in milliseconds

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/departures', async (req, res) => {
    try {
        const cacheKey = 'departures';
        const cachedData = cache.get(cacheKey);
        if (cachedData) {
            console.log('Data returned from cache');
            res.json(cachedData);
        } else {
            const departures = await ns.fetchDepartures();
            cache.put(cacheKey, departures, cacheDuration);
            res.json(departures);
        }
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

app.listen(3000, () => {
  console.log('App listening on port 3000!');
});