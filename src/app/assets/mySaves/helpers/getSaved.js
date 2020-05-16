const getSaved = async () => {
    let res = await fetch('/api/save/savedspins')
    let data = await res.json()
    return data
}

export {
    getSaved
}
