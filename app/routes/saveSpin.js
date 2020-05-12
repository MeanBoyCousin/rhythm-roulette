const express = require('express')
const router = express.Router()
const mode = require('../helpers/modeIntToString')
const database = require('../helpers/databaseAccess')
const currentUser = require('../helpers/currentUser')

router.put('/savespin', async (req, res) => {

    const db = await database.open(process.env.DB_PATH)

    const savedSpins = await db.get(`SELECT saved FROM users WHERE user_id = '${currentUser}';`)

    let savedSpinsArray = JSON.parse(savedSpins.saved)

    savedSpinsArray = [] // Temp measure to empty array each time to stop massive overflow. Needs updating to only allow max 5 saved spins.

    savedSpinsArray.push({
        date: Date.now(),
        mode: mode(req),
        ids: req.query.ids.split(',')
    })

    await db.run(`UPDATE users SET saved = '${JSON.stringify(savedSpinsArray)}' WHERE user_id = '${currentUser}';`)

    database.close(db)

    res.json({
        message: "Spin saved!"
    })

})

module.exports = router
