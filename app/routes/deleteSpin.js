const express = require('express')
const router = express.Router()
const database = require('../helpers/databaseAccess')
const currentUser = require('../helpers/currentUser')

router.get('/', async (req, res) => { // Should be DELETE request.

    try {

        // IMPORTANT
        // Unix data should be attached to the delete button element within the 'data-date' attribute.

        const spinToDelete = parseFloat(req.query.unix) // Unix should come from the body of the DELETE request.

        const db = await database.open(process.env.DB_PATH)

        const type = req.query.type // Type should come from the body of the DELETE request.

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
