import constant from '../costants'

export const isMovable = (fromCard, toCard) => {
    return true;

    const fromCardname = fromCard.name
    const toCardname = toCard.name
    if (toCard.belong === constant.IN_FOUNDATION) {
        if (toCardname === null) {
            return +getNumber(fromCardname) === 1
        } else if ((isBlack(toCardname) && isRed(fromCardname)) || (isRed(toCardname) && isBlack(fromCardname))) {
            return false
        } else {
            return getNumber(fromCardname) - getNumber(toCardname) === 1
        }
    } else if (toCard.belong === constant.IN_CASCADE) {
        if (toCardname === null) {

        } else if ((isBlack(toCardname) && isBlack(fromCardname)) || (isRed(toCardname) && isRed(fromCardname))) {
            return false
        } else {
            return getNumber(toCardname) - getNumber(fromCardname) === 1
        }
    }
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
