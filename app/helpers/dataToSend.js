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
        queryFilters.excStyles,
        queryFilters.videos
    )

    data = filterData(args).data

    let results = [];

    const length = data.length

    for (let i = 0; i < params.mode; i++) {
        results.push(data[Math.floor(Math.random() * length)])
    }

    results.push(length)

    return results
}

module.exports = dataToSend
