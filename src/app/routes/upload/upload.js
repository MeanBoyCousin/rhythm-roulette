const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const database = require('../../helpers/databaseAccess')
const currentUser = require('../../helpers/currentUser')

router.put('/user-upload', bodyParser.json(), async (req, res) => {
    try {
        const db = await database.open(process.env.DB_PATH)

        const savedSpins = await db.get(`SELECT saved FROM users WHERE user_id = '${currentUser}';`)

        const upload = req.body.date

        const uploadedSpins = await db
            .get(`SELECT uploaded FROM users WHERE user_id = '${currentUser}';`)
            .then(spins => JSON.parse(spins.uploaded))

        if (uploadedSpins.length < 5) {
            const matchingSavedSpin = JSON.parse(savedSpins.saved).filter(spin => spin.date === upload)[0]

            uploadedSpins.push({
                date: upload,
                url: req.body.link,
                mode: matchingSavedSpin.mode,
                spinData: matchingSavedSpin.ids
            })

            await db.run(
                `UPDATE users SET uploaded = '${JSON.stringify(uploadedSpins)}' WHERE user_id = '${currentUser}';`
            )

            await database.close(db)

            res.json({
                message: 'Spin uploaded!'
            })
        } else {
            await database.close(db)

            res.json({
                message: 'You may only upload 5 songs at a time, please delete one and try again!'
            })
        }
    } catch (error) {
        res.json({
            message: 'An error occurred!'
        })

        console.log(error)
    }
})

module.exports = router
