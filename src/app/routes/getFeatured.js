const express = require('express')
const router = express.Router()
const database = require('../helpers/databaseAccess')

const getFeatured = async () => {

    try {

        const db = await database.open(process.env.DB_PATH)

        const features = await db.get('SELECT first_name, uploaded FROM users ORDER BY RANDOM() LIMIT 1;').then(user => {
            const length = JSON.parse(user.uploaded).length
            const random = Math.floor(Math.random() * length)
            return {
                'first_name': user['first_name'],
                'uploaded': JSON.parse(user.uploaded)[random].url
            }
        })

        console.log(features)

        await database.close(db)

        return features

    } catch (error) {

        console.log(error)

    }
}

let data;

getFeatured().then(featured => {
    data = featured
    setInterval(async () => {
        data = await getFeatured()
    }, 86400000)
})

router.get('/featured', async (req, res) => {

    res.json({
        featured: data
    })

})

module.exports = router
