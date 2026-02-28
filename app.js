const express = require('express');
const promClient = require('prom-client');
const fs = require('fs');

const app = express();
const PORT = 5000;

// Collect default metrics
promClient.collectDefaultMetrics();

// Custom HTTP counter
const httpRequestCounter = new promClient.Counter({
    name: 'http_requests_total',
    help: 'Total number of HTTP requests'
});

// Middleware
app.use((req, res, next) => {
    httpRequestCounter.inc();
    const log = ${new Date().toISOString()} - ${req.method} ${req.url}\n;
    fs.appendFileSync("app.log", log);
    next();
});

app.get('/', (req, res) => {
    res.send('DevOps Capstone Project Running on Port 5000 🚀');
});

app.get('/metrics', async (req, res) => {
    res.set('Content-Type', promClient.register.contentType);
    res.end(await promClient.register.metrics());
});

app.listen(PORT, () => {
    console.log(Server running on port ${PORT});
});
