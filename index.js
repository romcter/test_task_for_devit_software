const express = require('express');
const cors = require('cors');
const app = express();
const port = 5002;

app.use(cors());

let requestCount = 0;
const requestLimit = 50;
const resetInterval = 1000;

setInterval(() => {
    requestCount = 0;
}, resetInterval);

app.get('/api', (req, res) => {
    requestCount++;
    if (requestCount > requestLimit) {
        return res.status(429).send('Too Many Requests');
    }

    const index = parseInt(req.query.index);
    const delay = Math.floor(Math.random() * 1000) + 1;

    setTimeout(() => {
        res.json({ index });
    }, delay);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});