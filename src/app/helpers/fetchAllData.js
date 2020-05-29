const database = require('./databaseAccess')

const fetchAllData = async () => {
    const db = await database.open(process.env.DB_PATH)

    const data = await db.all(`SELECT * FROM releases;`)

    database.close(db)

    data.forEach(release => {
        release.videos = JSON.parse(release.videos)
    })

    return data
}

module.exports = fetchAllData().then(data => () => {
    return data
})
