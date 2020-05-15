const express = require('express')
const router = express.Router()
const database = require('../../helpers/databaseAccess')
const currentUser = require('../../helpers/currentUser')

router.get('/uploaded', async (req, res) => {

    try {

        const db = await database.open(process.env.DB_PATH)

        let uploadedSongs = await db.get(`SELECT uploaded FROM users WHERE user_id = '${currentUser}';`).then(songs => JSON.parse(songs.uploaded))

        await database.close(db)

        res.json(uploadedSongs)

    } catch (error) {

        res.json({
            message: "An error occurred!"
        })

        console.log(error)

    }

})

module.exports = router
