import {
    CountUp
} from '../../countUp.js'

const buildCounter = (elem, val) => {
    const countUp = new CountUp(elem, val)

    if (!countUp.error) {
        countUp.start()
    } else {
        console.error(countUp.error)
    }
}

export {
    buildCounter
}
