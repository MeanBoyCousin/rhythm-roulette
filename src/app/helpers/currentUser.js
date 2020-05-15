require('dotenv').config()

const currentUser = () => {
    return process.env.DUMMY_USER_ID
}

module.exports = currentUser()
