const express = require('express')
const router = express.Router()
const database = require('../helpers/databaseAccess')
const currentUser = require('../helpers/currentUser')
const fetchAllData = require('../helpers/fetchAllData')

const getReleases = (releases, ids) => {
    return releases.reduce((acc, curr) => {
        if (ids.indexOf(curr.id) !== -1) acc.push(curr)
        return acc
    }, [])
}

router.get('/savedspins', async (req, res) => {

    const db = await database.open(process.env.DB_PATH)

    let savedSpins = await db.get(`SELECT saved FROM users WHERE user_id = '${currentUser}';`).then(spins => JSON.parse(spins.saved))

    database.close(db)

    const data = await fetchAllData

    savedSpins.forEach(spin => {
        spin.ids = getReleases(data(), spin.ids.map(parseFloat))
    })

    res.json(savedSpins)

})

module.exports = router
