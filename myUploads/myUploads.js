moment.locale(window.navigator.language) // Set date to locale format.

const getUploads = async () => {
    let res = await fetch('http://localhost:3000/api/upload/uploaded')
    let data = await res.json()
    return data
}

const deleteUpload = async (date, type) => {
    let res = await fetch('http://localhost:3000/api/delete', {
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

const buildPage = (data) => {
    Array.from(document.getElementsByClassName('date')).forEach((date, i) => {
        date.innerHTML = moment(data[i].date).format('l')
    })
    Array.from(document.getElementsByClassName('mode')).forEach((mode, i) => {
        mode.innerHTML = `${data[i].mode} Mode`
    })
    Array.from(document.getElementsByClassName('players')).forEach((player, i) => {
        player.src = `${data[i].url}&color=%23cf204b&auto_play=false&show_comments=true&show_teaser=false`
        player.width = '100%'
        player.height = 160
        player.frameBorder = false
    })
    Array.from(document.getElementsByClassName('view-spin-btn')).forEach((btn, i) => {
        btn.href = `http://localhost:3000/api/previousspin?ids=${data[i].spinData.join()}&pretty`
    })
    Array.from(document.getElementsByClassName('mode-img')).forEach((image, i) => {
        image.src = `./imgs/${data[i].mode}.png`
        image.title = `${data[i].mode} Mode`
    })
    Array.from(document.getElementsByClassName('delete-track')).forEach((icon, i) => {
        Object.assign(icon, {
            'data-date': data[i].date,
            'data-type': 'uploaded'
        })
        icon.onclick = () => {
            deleteUpload(icon['data-date'], icon['data-type']).then(location.reload())
        }
    })
}

getUploads().then(data => buildPage(data))
