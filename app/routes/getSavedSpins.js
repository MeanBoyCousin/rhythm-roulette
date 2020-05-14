const express = require('express')
const router = express.Router()
const database = require('../helpers/databaseAccess')
const currentUser = require('../helpers/currentUser')
const fetchAllData = require('../helpers/fetchAllData')
const getReleases = require('../helpers/getReleasesFromIDs')

router.get('/savedspins', async (req, res) => {

    try {

        const db = await database.open(process.env.DB_PATH)

        let savedSpins = await db.get(`SELECT saved FROM users WHERE user_id = '${currentUser}';`).then(spins => JSON.parse(spins.saved))

        await database.close(db)

        const data = await fetchAllData

        savedSpins.forEach(spin => {
            spin.ids = getReleases(data(), spin.ids)
        })

        res.json(savedSpins)

    } catch (error) {

        res.json({
            message: "An error occurred!"
        })

        console.log(error)

    }

})

module.exports = router
