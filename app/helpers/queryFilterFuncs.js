const filterYearRange = (data, lowerYear, upperYear) => {
    return data.filter(release => {
        if (lowerYear === undefined) {
            return release.year <= upperYear
        } else if (upperYear === undefined) {
            return release.year >= lowerYear
        } else {
            return release.year >= lowerYear && release.year <= upperYear
        }
    })
}

const filterInclusiveGenres = (data, incGenres) => {
    if (incGenres === undefined) {
        return data
    } else {
        return data.filter(release => {
            const matcherMap = incGenres.map(genre => release.genres.toLowerCase().includes(genre))
            return matcherMap.some(bool => bool === true)
        })
    }
}

const removeExcludedGenres = (data, excGenres) => {
    if (excGenres === undefined) {
        return data
    } else {
        return data.filter(release => {
            const matcherMap = excGenres.map(genre => release.genres.toLowerCase().includes(genre))
            return matcherMap.every(bool => bool === false)
        })
    }
}

const filterInclusiveStyles = (data, incStyles) => {
    if (incStyles === undefined) {
        return data
    } else {
        return data.filter(release => {
            const matcherMap = incStyles.map(style => release.styles.toLowerCase().includes(style))
            return matcherMap.some(bool => bool === true)
        })
    }
}

const removeExcludedStyles = (data, excStyles, excUndefStyles) => {
    if (excUndefStyles !== undefined && excStyles !== undefined) excStyles.push(excUndefStyles)
    if (excUndefStyles !== undefined && excStyles === undefined) excStyles = [excUndefStyles]
    console.log(excStyles)
    if (excStyles === undefined) {
        return data
    } else {
        return data.filter(release => {
            const matcherMap = excStyles.map(style => release.styles.toLowerCase().includes(style))
            return matcherMap.every(bool => bool === false)
        })
    }
}

module.exports = {
    years: filterYearRange,
    incGenres: filterInclusiveGenres,
    excGenres: removeExcludedGenres,
    incStyles: filterInclusiveStyles,
    excStyles: removeExcludedStyles
}
