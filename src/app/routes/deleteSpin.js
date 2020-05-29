const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const database = require('../helpers/databaseAccess')
const currentUser = require('../helpers/currentUser')

router.delete('/', bodyParser.json(), async (req, res) => {
    try {
        const spinToDelete = req.body.date

        const db = await database.open(process.env.DB_PATH)

        const type = req.body.type

        const spins = await db.get(`SELECT ${type} FROM users WHERE user_id = '${currentUser}';`)

        const spinsArray = JSON.parse(spins[type]).filter(spin => spin.date !== spinToDelete)

        await db.run(`UPDATE users SET ${type} = '${JSON.stringify(spinsArray)}' WHERE user_id = '${currentUser}';`)

        await database.close(db)

        res.sendStatus(200)
    } catch (error) {
        res.sendStatus(500)

        console.log(error)
    }
})

module.exports = router
