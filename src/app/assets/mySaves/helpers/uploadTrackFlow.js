import {
    inputValidate
} from './inputValidate.js'

const uploadTrackFlow = async () => {
    const uploadModal = document.getElementById('upload-modal')
    const uploadCancel = document.getElementById('upload-cancel')
    const uploadCommit = document.getElementById('upload-commit')
    const input = document.getElementById('upload-link')

    const uploadTrack = async (date, link) => {
        await fetch('/api/upload/user-upload', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                date: date,
                link: link
            })
        })
    }


    uploadCancel.onclick = () => {
        uploadModal.style.opacity = 0;
        setTimeout(() => {
            uploadModal.style.display = 'none';
        }, 200);
        input.value = ''
    }

    uploadCommit.onclick = async () => {
        await uploadTrack(uploadCommit['data-date'], inputValidate(input.value))
        location.reload()
    }
}

export {
    uploadTrackFlow
}
