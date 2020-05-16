import {
    getSaved
} from './helpers/getSaved.js'
import {
    buildSaves
} from './helpers/buildSaves.js'
import {
    initCarousels
} from './helpers/initCarousels.js'
import {
    deleteTrackFlow
} from './helpers/deleteTrackFlow.js'
import {
    uploadTrackFlow
} from './helpers/uploadTrackFlow.js'


moment.locale(window.navigator.language) // Set date to locale format.

getSaved().then(data => {
    buildSaves(data)
    initCarousels(data)
    deleteTrackFlow()
    uploadTrackFlow()
})
