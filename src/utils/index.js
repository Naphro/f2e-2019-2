export const isDraggable = (cardname, prevCardname) => {
    if ((isBlack(cardname) && isBlack(prevCardname)) || (isRed(cardname) && isRed(prevCardname))) {
        return false
    } else {
        return getNumber(cardname) - getNumber(prevCardname) === 1
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
