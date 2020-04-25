const database = require('../helpers/databaseAccess')

const getAllData = async () => {

    const db = await database.open(process.env.DB_PATH)

    const data = await db.all(`SELECT * FROM releases;`)

    database.close(db)

    data.forEach(release => {
        release.videos = JSON.parse(release.videos)
    })

    return data
}

module.exports = getAllData
