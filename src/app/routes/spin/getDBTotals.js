const express = require('express')
const router = express.Router()
const fetchAllData = require('../../helpers/fetchAllData')

const reduceToUnique = array => {
    return array.reduce((acc, curr) => {
        if (acc.indexOf(curr) === -1) acc.push(curr)
        return acc
    }, [])
}

router.get('/database-info', async (req, res) => {

    const getData = await fetchAllData

    const data = getData()

    const releasesTotal = data.length

    const genresTotal = reduceToUnique(data.flatMap(release => release.genres.split(','))).length - 2

    const stylesTotal = reduceToUnique(data.flatMap(release => release.styles.split(','))).length

    const years = reduceToUnique(data.map(release => release.year))

    res.json({
        releases: releasesTotal,
        genres: genresTotal,
        styles: stylesTotal,
        years: Math.max(...years) - Math.min(...years)
    })

})

module.exports = router
