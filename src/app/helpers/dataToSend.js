const queryFilters = require('./queryFilterFuncs')
const R = require('ramda')

const dataToSend = (data, params) => {
    const args = {
        data: data,
        params: params
    }

    const filterData = R.pipe(
        queryFilters.years,
        queryFilters.incGenres,
        queryFilters.excGenres,
        queryFilters.videos
    )(args).data

    const length = filterData.length

    const results = [...Array(parseFloat(params.mode))].map(() => {
        return filterData[Math.floor(Math.random() * length)]
    })

    results.push(length)

    return results
}

module.exports = dataToSend
