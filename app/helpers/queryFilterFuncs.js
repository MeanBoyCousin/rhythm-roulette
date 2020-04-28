const filterYearRange = (args) => {
    const {
        data,
        params
    } = args

    return {
        data: data.filter(release => {
            if (params.lowerYear === undefined) {
                return release.year <= params.upperYear
            } else if (params.upperYear === undefined) {
                return release.year >= params.lowerYear
            } else {
                return release.year >= params.lowerYear && release.year <= params.upperYear
            }
        }),
        params: params
    }
}

const filterInclusiveGenres = (args) => {
    const {
        data,
        params
    } = args

    if (params.incGenres === undefined) {
        return {
            data: data,
            params: params
        }
    } else {
        return {
            data: data.filter(release => {
                const matcherMap = params.incGenres.map(genre => release.genres.toLowerCase().includes(genre))
                return matcherMap.some(bool => bool === true)
            }),
            params: params
        }
    }
}

const removeExcludedGenres = (args) => {
    const {
        data,
        params
    } = args

    if (params.excGenres === undefined) {
        return {
            data: data,
            params: params
        }
    } else {
        return {
            data: data.filter(release => {
                const matcherMap = params.excGenres.map(genre => release.genres.toLowerCase().includes(genre))
                return matcherMap.every(bool => bool === false)
            }),
            params: params
        }
    }
}

const filterInclusiveStyles = (args) => {
    const {
        data,
        params
    } = args

    if (params.incStyles === undefined) {
        return {
            data: data,
            params: params
        }
    } else {
        return {
            data: data.filter(release => {
                const matcherMap = params.incStyles.map(style => release.styles.toLowerCase().includes(style))
                return matcherMap.some(bool => bool === true)
            }),
            params: params
        }
    }
}

const removeExcludedStyles = (args) => {
    const {
        data,
        params
    } = args

    if (params.excUndefStyles === 'true' && params.excStyles !== undefined) params.excStyles.push('undefined')
    if (params.excUndefStyles === 'true' && params.excStyles === undefined) params.excStyles = ['undefined']
    if (params.excStyles === undefined) {
        return {
            data: data,
            params: params
        }
    } else {
        return {
            data: data.filter(release => {
                const matcherMap = params.excStyles.map(style => release.styles.toLowerCase().includes(style))
                return matcherMap.every(bool => bool === false)
            }),
            params: params
        }
    }
}

module.exports = {
    years: filterYearRange,
    incGenres: filterInclusiveGenres,
    excGenres: removeExcludedGenres,
    incStyles: filterInclusiveStyles,
    excStyles: removeExcludedStyles
}
