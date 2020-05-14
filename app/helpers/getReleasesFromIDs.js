const getReleases = (releases, ids, keys) => {
    return releases.reduce((acc, curr) => {
        if (ids.indexOf(curr.id) !== -1) acc.push(curr)
        return acc
    }, [])
}

module.exports = getReleases
