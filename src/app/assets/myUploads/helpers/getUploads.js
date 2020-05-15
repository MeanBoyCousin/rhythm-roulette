const getUploads = async () => {
    let res = await fetch('/api/upload/uploaded')
    let data = await res.json()
    return data
}

export {
    getUploads
}
