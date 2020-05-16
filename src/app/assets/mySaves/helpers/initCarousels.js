const initCarousels = data => {
    const spinCarousels = Array.from(document.getElementsByClassName('carousel'))
    spinCarousels.forEach((spin, i) => {
        const length = data[i].ids.map(release => release.videos).flat().length
        M.Carousel.init(spin, {
            numVisible: (length % 2 === 0) ?
                length + 1 : length
        })
    })
}

export {
    initCarousels
}
