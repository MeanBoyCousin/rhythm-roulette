const queryFilters = require('./queryFilterFuncs')

const dataToSend = (data, params) => {

    data = queryFilters.years(data, params.lowerYear, params.upperYear)

    data = queryFilters.incGenres(data, params.incGenres)

    data = queryFilters.excGenres(data, params.excGenres)

    data = queryFilters.incStyles(data, params.incStyles)

    data = queryFilters.excStyles(data, params.excStyles, params.excUndefStyles)

    let results = [];

    const length = data.length

    for (let i = 0; i < params.mode; i++) {
        results.push(data[Math.floor(Math.random() * length)])
    }

    results.push(length)

    return results
}

module.exports = dataToSend
