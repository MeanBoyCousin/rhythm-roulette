const getDBInfo = async () => {
    let res = await fetch('/api/database-info')
    let data = res.json()
    return data
}

export {
    getDBInfo
}