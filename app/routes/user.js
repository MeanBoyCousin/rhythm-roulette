const express = require('express')
const router = express.Router()
const fetchAllData = require('../helpers/fetchAllData')

router.get('/', async (req, res) => {

    const data = await fetchAllData

    let albumIDs = req.query.ids.split(',').map(id => parseFloat(id))

    const reducer = data().reduce((acc, curr) => {
        if (albumIDs.indexOf(curr.id) !== -1) acc.push(curr)
        return acc
    }, [])

    res.json(reducer)

})

module.exports = router
