const inputValidate = link => {
    return link.match(/(https:\/\/w.soundcloud.com\/player\/\?url=https%3A\/\/api.soundcloud.com\/tracks\/\d*)/)[0]
}

export {
    inputValidate
}
