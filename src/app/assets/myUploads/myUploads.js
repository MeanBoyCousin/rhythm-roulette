import {
    getUploads
} from './helpers/getUploads.js'
import {
    buildTracks
} from './helpers/buildTracks.js'
import {
    deleteTrack
} from './helpers/deleteTrack.js'

const deleteModal = document.getElementById('delete-modal')
const deleteCancel = document.getElementById('delete-cancel')
const deleteCommit = document.getElementById('delete-commit')

moment.locale(window.navigator.language) // Set date to locale format.

getUploads().then(data => buildTracks(data))

deleteCancel.onclick = () => {
    deleteModal.style.opacity = 0;
    setTimeout(() => {
        deleteModal.style.display = 'none';
    }, 200);
}

deleteCommit.onclick = async () => {
    await deleteTrack(deleteCommit['data-date'], deleteCommit['data-type']).then(location.reload())
}
