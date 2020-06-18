const filterYearRange = ({ data, params }) => {
    return {
        data: data.filter(release => {
            return params.lowerYear === undefined
                ? release.year <= params.upperYear
                : params.upperYear === undefined
                ? release.year >= params.lowerYear
                : release.year >= params.lowerYear && release.year <= params.upperYear
        }),
        params: params
    }
}

const filterInclusiveGenres = ({ data, params }) => {
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

const removeExcludedGenres = ({ data, params }) => {
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

const amountOfVideos = ({ data, params }) => {
    if (params.videos === undefined) {
        return {
            data: data,
            params: params
        }
    } else {
        return {
            data: data.filter(release => {
                return release.videos.length >= params.videos
            }),
            params: params
        }
    }
}

module.exports = {
    years: filterYearRange,
    incGenres: filterInclusiveGenres,
    excGenres: removeExcludedGenres,
    videos: amountOfVideos
}
