import {IN_FOUNDATION, IN_CASCADE, IN_CELL} from '../costants'

export const isMovable = (fromCard, toCard) => {
    const fromCardname = fromCard.name
    const toCardname = toCard.name

    if (fromCard.name === toCard.name) {
        return false
    }

    if (toCard.belong === IN_FOUNDATION) {
        if (toCardname === null) {
            return +getNumber(fromCardname) === 1
        } else if (!isSameSuit(fromCardname, toCardname)) {
            return false
        } else {
            return getNumber(fromCardname) - getNumber(toCardname) === 1
        }
    } else if (toCard.belong === IN_CASCADE) {
        if (toCardname === null) {
            return true
        } else if ((isBlack(toCardname) && isBlack(fromCardname)) || (isRed(toCardname) && isRed(fromCardname))) {
            return false
        } else {
            const draggable = getNumber(toCardname) - getNumber(fromCardname) === 1
            return draggable
        }
    } else if (toCard.belong === IN_CELL) {
        return true;
    }
}

export const isSameSuit = (card1, card2) => {
    const regex = /\d/g
    const suit1 = card1.replace(regex, '');
    const suit2 = card2.replace(regex, '')
    return suit1 === suit2
}

export const isBlack = (cardname) => {
    const regexBlack = /(club)|(spade)/g
    return regexBlack.test(cardname)
}

export const isRed = (cardname) => {
    const regexRed = /(diamond)|(heart)/g
    return regexRed.test(cardname)
}

export const getNumber = (cardname) => {
    const regex = /\d/g
    return cardname.match(regex).join('')
}

export const deepClone = (obj) => {
    return JSON.parse(JSON.stringify(obj))
}
