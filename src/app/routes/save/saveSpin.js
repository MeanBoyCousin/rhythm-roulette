const express = require('express')
const router = express.Router()
const mode = require('../../helpers/modeIntToString')
const database = require('../../helpers/databaseAccess')
const currentUser = require('../../helpers/currentUser')

router.get('/savespin', async (req, res) => {  // Should be PUT request.

    try {
        const db = await database.open(process.env.DB_PATH)

        const savedSpins = await db.get(`SELECT saved FROM users WHERE user_id = '${currentUser}';`)

        let savedSpinsArray = JSON.parse(savedSpins.saved)

        if (savedSpinsArray.length < 5) {
            savedSpinsArray.push({
                date: Date.now(),
                mode: mode(req),
                ids: req.query.ids.split(',').map(parseFloat) // IDs should come from the body of the PUT request.
            })

            await db.run(
                `UPDATE users SET saved = '${JSON.stringify(savedSpinsArray)}' WHERE user_id = '${currentUser}';`
            )

            await database.close(db)

            res.json({
                message: 'Spin saved!'
            })
        } else {
            await database.close(db)

            res.json({
                message: 'You may only save 5 spins at a time, please delete one and try again!'
            })
        }
    } catch (error) {
        res.json({
            message: 'Unable to upload, an error occurred!'
        })

        console.log(error)
    }
})

module.exports = router
