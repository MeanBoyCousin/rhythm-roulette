const express = require('express')
const router = express.Router()
const fetchAllData = require('../../helpers/fetchAllData')
const getReleases = require('../../helpers/getReleasesFromIDs')

router.get('/previousspin', async (req, res) => {

    const data = await fetchAllData

    const ids = req.query.ids.split(',').map(parseFloat)

    res.json(getReleases(data(), ids))

})

module.exports = router
