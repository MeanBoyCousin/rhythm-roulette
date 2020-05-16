const express = require('express')
const router = express.Router()
const path = require('path')

router.get('/saved', (req, res) => {
    res.sendFile(path.join(__dirname, '../../views/mySaves.html'))
})

module.exports = router
