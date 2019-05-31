const express = require('express');
const app = express();

const Datastore = require('nedb');
const database = new Datastore('database.db');
const timestamp = Date.now();



app.listen(3000, () => console.log('Listening at 3000'));
app.use(express.static('public'));
app.use(express.json({
    limit: '1mb'
}));

database.loadDatabase();

app.get('/api', (request, response) => {
    const data = database.find(request.body);
    response.json(data);
});

app.post('/api', (request, response) => {
    console.log(request.body);
    const data = request.body;
    data.timestamp = timestamp;
    database.insert(data);
    response.json({
        mood: data.mood,
        status: 'success',
        latitute: data.lat,
        longitute: data.lon,
        timestamp: timestamp
    });
});