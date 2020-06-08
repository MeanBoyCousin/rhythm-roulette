const express = require('express')
const router = express.Router()
const database = require('../../helpers/databaseAccess')

router.get('/database-stats', async (req, res) => {
    const db = await database.open(process.env.DB_PATH)

    const data = await db.get(`SELECT * FROM stats WHERE id = 1;`)

    delete data.id
    delete data.genres // Can be removed if ever needed.

    res.json(data)
})

module.exports = router
