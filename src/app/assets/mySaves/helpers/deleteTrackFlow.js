const deleteTrackFlow = async () => {
    const deleteModal = document.getElementById('delete-modal')
    const deleteCancel = document.getElementById('delete-cancel')
    const deleteCommit = document.getElementById('delete-commit')

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

    deleteCancel.onclick = () => {
        deleteModal.style.opacity = 0;
        setTimeout(() => {
            deleteModal.style.display = 'none';
        }, 200);
    }

    deleteCommit.onclick = async () => {
        await deleteTrack(deleteCommit['data-date'], deleteCommit['data-type'])
        location.reload()
    }
}


export {
    deleteTrackFlow
}
