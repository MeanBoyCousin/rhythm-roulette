const express = require('express')
const router = express.Router()
const fetchAllData = require('../helpers/fetchAllData')
const send = require('../helpers/dataToSend')

let data;

fetchAllData().then(val => data = val)

router.get('/', async (req, res) => {

    const options = {
        lowerYear: (req.query.l !== undefined) ? req.query.l : 1860,
        upperYear: (req.query.u !== undefined) ? req.query.u : new Date().getFullYear(),
        incGenres: (req.query.ig !== undefined) ? req.query.ig.split(',') : undefined,
        excGenres: (req.query.eg !== undefined) ? req.query.eg.split(',') : undefined,
        incStyles: (req.query.is !== undefined) ? req.query.is.split(',') : undefined,
        excStyles: (req.query.es !== undefined) ? req.query.es.split(',') : undefined,
        excUndefStyles: (req.query.eus !== undefined) ? 'undefined' : undefined,
        mode: req.query.m
    }

    console.log(options)

    res.json(send(data, options))

})

module.exports = router
