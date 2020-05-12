const express = require('express')
require('dotenv').config()
const pretty = require('express-prettify')
const cors = require('cors')

const app = express()
app.use(pretty({
    query: 'pretty'
}));
app.use(cors())

const home = require('./routes/home')
const api = require('./routes/spin')
const saveSpin = require('./routes/saveSpin') // Put request to update saved spins.
const savedSpins = require('./routes/getSavedSpins') // Used to search saved spins against the releases DB to return all info.

app.use('/', home)
app.use('/api', [api, saveSpin, savedSpins])

app.get('*', (req, res) => {
    res.send('404')
});

app.listen(process.env.port || 3000)
console.log('http://localhost:3000/')
