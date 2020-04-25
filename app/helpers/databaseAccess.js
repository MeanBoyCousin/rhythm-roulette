const sqlite3 = require('sqlite3').verbose()
const {
    open
} = require('sqlite')

const openDB = async (path) => {
    const db = await open({
        filename: path,
        driver: sqlite3.Database
    })
    return db
}

const closeDB = async (db) => {
    await db.close()
}

module.exports = {
    open: openDB,
    close: closeDB
}
