import React, { useState } from 'react'
import svgMap from '../../svgs'
import { isMovable } from '../../utils'

export default function Card ({card, className, index, onMove}) {

    const [style, setStyle] = useState({top: (index * 30) + 'px'})

    const handleDragStart = (event) => {
        event.dataTransfer.setData('text/plain', JSON.stringify(card))
    }

    const handleDragOver = (event) => {
        event.preventDefault()
    }

    const handleDrop = (event) => {
        const text = event.dataTransfer.getData('text')
        const fromCard = JSON.parse(text)
        const toCard = card
        console.log(fromCard, toCard)
        if (isMovable(fromCard, toCard)) {
            onMove(fromCard, toCard)
        }
    }

    const dragEvents = card.draggable ? {
        onDragStart: handleDragStart
    } : null

    const dropEvents = card.droppable ? {
        onDragOver: handleDragOver,
        onDrop: handleDrop
    } : null

    return (
        <img className={className}
             style={style}
             src={svgMap['./cards/' + card.name + '.svg']}
             alt="card"
             draggable={card.draggable}
             {...dragEvents}
             {...dropEvents}
        />
    )
}
