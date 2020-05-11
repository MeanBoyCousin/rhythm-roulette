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
const api = require('./routes/api')
const user = require('./routes/user')

app.use('/', home)
app.use('/api', api)
app.use('/user', user) // Used to search a saved set of release IDs against the releases DB to return all info.

app.get('*', (req, res) => {
    res.send('404')
});

app.listen(process.env.port || 3000)
console.log('http://localhost:3000/')
