const express = require('express')
require('dotenv').config()
const pretty = require('express-prettify')
const cors = require('cors')

const app = express()
app.use(pretty({
    query: 'pretty'
})) // Only needed in dev.
app.use(cors()) // Do I need this?

const home = require('./routes/home')
const spin = require('./routes/spin')
const saveSpin = require('./routes/saveSpin') // Put request to update saved spins.
const savedSpins = require('./routes/getSavedSpins') // Used to fetch users saved spins.
const deleteSpin = require('./routes/deleteSpin') // Used to delete a saved or uploaded spin.
const upload = require('./routes/upload') // Used to upload a track made from a spin.
const uploaded = require('./routes/getUploaded') // Used to fetch users uploaded songs.

app.use('/', home)
app.use('/api', spin)
app.use('/api/save', [saveSpin, savedSpins])
app.use('/api/upload', [upload, uploaded])
app.use('/api/delete', deleteSpin)

app.get('*', (req, res) => {
    res.send('404')
});

app.listen(process.env.port || 3000)
console.log('http://localhost:3000/')
