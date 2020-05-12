const modeIntToString = req => {
    if (req.query.ids.split(',').length === 1) {
        return 'Hard'
    } else if (req.query.ids.split(',').length === 3) {
        return 'Normal'
    } else if (req.query.ids.split(',').length === 5) {
        return 'Easy'
    } else {
        return 'Unknown Mode'
    }
}

module.exports = modeIntToString