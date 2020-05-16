const buildSaves = (data) => {
    const pageContainer = document.getElementById('container')
    const deleteTrackModal = document.getElementById('delete-modal')
    const deleteCommitBtn = document.getElementById('delete-commit')
    const uploadTrackModal = document.getElementById('upload-modal')
    const uploadCommitBtn = document.getElementById('upload-commit')

    data.forEach(spin => {
        const trackContainer = document.createElement('div')
        trackContainer.classList.add('track-container')

        const deleteButton = document.createElement('button')
        deleteButton.classList.add('delete-track')
        Object.assign(deleteButton, {
            'data-date': spin.date,
            'data-type': 'saved'
        })
        deleteButton.onclick = () => {
            deleteTrackModal.style.display = 'flex'
            setTimeout(() => {
                deleteTrackModal.style.opacity = 1
            }, 50)
            Object.assign(deleteCommitBtn, {
                'data-date': deleteButton['data-date'],
                'data-type': deleteButton['data-type']
            })
        }
        const deleteIcon = document.createElement('i')
        deleteIcon.classList.add('material-icons', 'delete-icon')
        deleteIcon.innerHTML = 'delete'
        deleteButton.appendChild(deleteIcon)
        trackContainer.appendChild(deleteButton)

        const topInfo = document.createElement('div')
        topInfo.classList.add('top-info')
        const date = document.createElement('p')
        date.classList.add('date')
        date.innerHTML = moment(spin.date).format('l')
        topInfo.appendChild(date)
        const divider = document.createElement('p')
        divider.innerHTML = '&nbsp;|&nbsp;'
        topInfo.appendChild(divider)
        const modeImg = document.createElement('img')
        modeImg.classList.add('mode-img')
        modeImg.src = `/imgs/${spin.mode}_Red.png`
        modeImg.title = `${spin.mode} Mode`
        topInfo.appendChild(modeImg)
        trackContainer.appendChild(topInfo)

        const carousel = document.createElement('div')
        carousel.classList.add('carousel')
        const thumbnails = spin.ids.map(release => release.videos).flat().map(video => video.src.slice(32))
        thumbnails.forEach(video => {
            const carouselItem = document.createElement('a')
            carouselItem.classList.add('carousel-item')
            const itemImage = document.createElement('img')
            itemImage.src = `https://img.youtube.com/vi/${video}/0.jpg`
            itemImage.onload = () => {
                if (itemImage.naturalWidth === 120) itemImage.src = '/imgs/temp_logo.png'
            }
            carouselItem.appendChild(itemImage)
            carousel.appendChild(carouselItem)
        })
        trackContainer.appendChild(carousel)

        const uvContainer = document.createElement('span')
        uvContainer.classList.add('upload-view-container')
        const uploadButton = document.createElement('button')
        uploadButton.classList.add('upload-button')
        const uploadIcon = document.createElement('i')
        uploadIcon.classList.add('material-icons', 'upload-track-icon')
        Object.assign(uploadIcon, {
            'data-date': spin.date
        })
        uploadIcon.innerHTML = 'publish'
        uploadIcon.onclick = () => {
            uploadTrackModal.style.display = 'flex'
            setTimeout(() => {
                uploadTrackModal.style.opacity = 1
            }, 50)
            Object.assign(uploadCommitBtn, {
                'data-date': uploadIcon['data-date']
            })
        }
        uploadButton.appendChild(uploadIcon)
        const spinBtn = document.createElement('a')
        spinBtn.classList.add('view-spin-btn')
        spinBtn.innerHTML = 'view this spin'
        spinBtn.href = `/api/previousspin?ids=${spin.ids.map(release => release.id).flat()}`
        uvContainer.appendChild(uploadButton)
        uvContainer.appendChild(spinBtn)
        trackContainer.appendChild(uvContainer)

        const hr = document.createElement('hr')
        trackContainer.appendChild(hr)

        pageContainer.appendChild(trackContainer)

    })
}

export {
    buildSaves
}
