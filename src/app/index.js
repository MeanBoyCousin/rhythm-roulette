const express = require('express');
require('dotenv').config();
const pretty = require('express-prettify');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(
    pretty({
        query: 'pretty',
    })
); // Only needed in dev.
app.use(cors()); // Do I need this?
app.use(express.static(path.join(__dirname, '/assets')));

const home = require('./routes/home');
const myUploads = require('./routes/user/myUploads');
const mySaves = require('./routes/user/mySaves');

const spin = require('./routes/spin/spin'); // Main game spin feature.
const previousSpin = require('./routes/spin/getPreviousSpin'); // Used to fetch a previous spin when release IDs are known.
const getDBTotals = require('./routes/spin/getDBTotals'); // Used to get info from DB such as total releases, total genres, etc.
const featured = require('./routes/getFeatured'); // Used to get a featured track from users each day for the home page.
const saveSpin = require('./routes/save/saveSpin'); // Put request to update saved spins.
const savedSpins = require('./routes/save/getSavedSpins'); // Used to fetch users saved spins.
const deleteSpin = require('./routes/deleteSpin'); // Used to delete a saved or uploaded spin.
const upload = require('./routes/upload/upload'); // Used to upload a track made from a spin.
const uploaded = require('./routes/upload/getUploaded'); // Used to fetch users uploaded songs.

app.use('/', home);
app.use('/user', [myUploads, mySaves]);
app.use('/api', [spin, previousSpin, getDBTotals, featured]);
app.use('/api/save', [saveSpin, savedSpins]);
app.use('/api/upload', [upload, uploaded]);
app.use('/api/delete', deleteSpin);

app.get('*', (req, res) => {
    res.sendStatus('404');
});

app.listen(process.env.port || 3000);
console.log('http://localhost:3000/');
