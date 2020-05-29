const database = require('../helpers/databaseAccess')
const path = require('path')

const addUser = async () => {
    try {
        const db = await database.open(path.join(__dirname, '../../../rhythm-roulette.db'))

        await db.run(
            `INSERT INTO users (first_name, last_name, email, saved, uploaded) VALUES ("Charles", "Bryant", "CharlesBryant@teleworm.us", "[]", "[]");`
        )

        await database.close(db)
    } catch (error) {
        console.log(error)
    }
}

addUser()
