const modeIntToString = req => {
    return req.query.ids.split(',').length === 1
        ? 'Hard'
        : req.query.ids.split(',').length === 3
        ? 'Normal'
        : req.query.ids.split(',').length === 5
        ? 'Easy'
        : 'Unknown Mode'
}

module.exports = modeIntToString
