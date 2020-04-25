const express = require('express')
require('dotenv').config()
const pretty = require('express-prettify')

const app = express()
app.use(pretty({
    query: 'pretty'
}));

const home = require('./routes/home')
const api = require('./routes/api')

app.use('/', home)
app.use('/api', api)

app.get('*', (req, res) => {
    res.send('404')
});

app.listen(process.env.port || 3000)
console.log('http://localhost:3000/')
