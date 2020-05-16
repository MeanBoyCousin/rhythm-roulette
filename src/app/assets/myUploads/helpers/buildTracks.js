const buildTracks = (data) => {
    const pageContainer = document.getElementById('container')
    const deleteTrackModal = document.getElementById('delete-modal')
    const deleteCommitBtn = document.getElementById('delete-commit')

    data.forEach((track, i) => {
        const trackContainer = document.createElement('div')
        trackContainer.classList.add('track-container')

        const deleteButton = document.createElement('button')
        deleteButton.classList.add('delete-track')
        Object.assign(deleteButton, {
            'data-date': track.date,
            'data-type': 'uploaded'
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
        date.innerHTML = moment(track.date).format('l')
        topInfo.appendChild(date)
        const divider = document.createElement('p')
        divider.innerHTML = '&nbsp;|&nbsp;'
        topInfo.appendChild(divider)
        const modeImg = document.createElement('img')
        modeImg.classList.add('mode-img')
        modeImg.src = `/imgs/${track.mode}_Red.png`
        modeImg.title = `${track.mode} Mode`
        topInfo.appendChild(modeImg)
        trackContainer.appendChild(topInfo)

        const player = document.createElement('iframe')
        player.classList.add('players')
        player.src = `${track.url}&color=%23cf204b&auto_play=false&show_comments=true&show_teaser=false&hide_related=true&visual=true`
        player.width = '100%'
        player.height = 160
        player.frameBorder = false
        trackContainer.appendChild(player)

        const lvContainer = document.createElement('span')
        lvContainer.classList.add('likes-view-container')
        const likeContainer = document.createElement('div')
        likeContainer.classList.add('like-container')
        const icon = document.createElement('span')
        icon.classList.add('material-icons', 'like-flame')
        icon.innerHTML = 'whatshot'
        likeContainer.appendChild(icon)
        const count = document.createElement('p')
        count.classList.add('like-count')
        count.innerHTML = 20 // This needs to be updated to be dynamic.
        likeContainer.appendChild(count)
        const spinBtn = document.createElement('a')
        spinBtn.classList.add('view-spin-btn')
        spinBtn.innerHTML = 'View this spin'
        spinBtn.href = `/api/previousspin?ids=${track.spinData.join()}`
        lvContainer.appendChild(likeContainer)
        lvContainer.appendChild(spinBtn)
        trackContainer.appendChild(lvContainer)

        const hr = document.createElement('hr')
        trackContainer.appendChild(hr)

        pageContainer.appendChild(trackContainer)

    })
}

export {
    buildTracks
}
