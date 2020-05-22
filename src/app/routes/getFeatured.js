const express = require('express');
const router = express.Router();
const database = require('../helpers/databaseAccess');

const getFeatured = async () => {
    try {
        const db = await database.open(process.env.DB_PATH);

        const features = await db
            .get('SELECT first_name, last_name, uploaded FROM users ORDER BY RANDOM() LIMIT 1;')
            .then(user => {
                const length = JSON.parse(user.uploaded).length;
                const random = Math.floor(Math.random() * length);
                return {
                    username: `${user['first_name']} ${user['last_name']}`, // Will be replaced for username.
                    uploaded: JSON.parse(user.uploaded)[random].url,
                };
            });

        await database.close(db);

        return features;
    } catch (error) {
        console.log(error);
    }
};

let data;

getFeatured().then(featured => {
    data = featured;
    setInterval(async () => {
        data = await getFeatured();
    }, 86400000);
});

router.get('/featured', async (req, res) => {
    res.json(data);
});

module.exports = router;
