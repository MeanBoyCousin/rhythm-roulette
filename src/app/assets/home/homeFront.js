import {
    buildCounter
} from './helpers/buildCounter.js'
import {
    getDBInfo
} from './helpers/getDBInfo.js'

const releases = document.getElementById('total-releases')
const genres = document.getElementById('total-genres')
const styles = document.getElementById('total-styles')
const years = document.getElementById('total-years')

const elements = [releases, genres, styles, years]
const counterContainers = Array.from(document.getElementsByClassName('counter-container'))

getDBInfo().then(data => {
    counterContainers.forEach((counter, i) => {
        setTimeout(() => {
            counter.classList.add('fadeIn')
            buildCounter(elements[i], data[Object.keys(data)[i]])
        }, i * 250);
    })
})
