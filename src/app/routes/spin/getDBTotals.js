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

    const songsTotal = data.reduce((acc, curr) => {
        return acc + curr.videos.length
    }, 0)

    const releasesTotal = data.length

    const stylesTotal = reduceToUnique(data.flatMap(release => release.styles.split(','))).length

    const years = reduceToUnique(data.map(release => release.year))

    res.json({
        songs: songsTotal,
        releases: releasesTotal,
        styles: stylesTotal,
        years: Math.max(...years) - Math.min(...years)
    })
})

module.exports = router
