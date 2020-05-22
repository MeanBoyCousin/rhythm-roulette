const buildFeaturedTrack = async container => {
    let res = await fetch('/api/featured');
    let data = await res.json();

    const player = document.createElement('iframe');
    player.src = `${data.uploaded}&color=%23cf204b&auto_play=false&show_comments=true&show_teaser=false&hide_related=true&visual=true`;
    player.width = '100%';
    player.height = 160;
    player.frameBorder = false;
    container.appendChild(player);
};

export { buildFeaturedTrack };
