const express = require('express')
const router = express.Router()
const database = require('../helpers/databaseAccess')
const currentUser = require('../helpers/currentUser')
const fetchAllData = require('../helpers/fetchAllData')

const getReleases = (releases, ids) => {
    return releases.reduce((acc, curr) => {
        if (ids.indexOf(curr.id) !== -1) acc.push({
            artists: curr.artists,
            title: curr.title,
            genre: curr.genres
        })
        return acc
    }, [])
}

router.get('/uploaded', async (req, res) => {

    try {

        const db = await database.open(process.env.DB_PATH)

        let uploadedSongs = await db.get(`SELECT uploaded FROM users WHERE user_id = '${currentUser}';`).then(songs => JSON.parse(songs.uploaded))

        await database.close(db)

        const data = await fetchAllData

        uploadedSongs.forEach(song => {
            song.spinData = getReleases(data(), song.spinData)
        })

        res.json(uploadedSongs)

    } catch (error) {

        res.json({
            message: "An error occurred!"
        })

        console.log(error)

    }

})

module.exports = router
