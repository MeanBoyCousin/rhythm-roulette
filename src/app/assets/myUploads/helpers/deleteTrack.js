const deleteTrack = async (date, type) => {
    await fetch('/api/delete', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            date: date,
            type: type
        })
    })
}

export {
    deleteTrack
}
