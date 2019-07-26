import React from 'react'
import Card from '../card/Card'
import './Foundation.css'
import { isMovable } from '../../utils'
import { IN_FOUNDATION} from '../../costants'

export default function Foundation({foundation, onMove, cards}) {
    const card = cards.length === 0 ? null : cards[cards.length - 1];

    const handleDragOver = (event) => {
        event.preventDefault();
    }

    const handleDrop = (event) => {
        event.preventDefault();
        const text = event.dataTransfer.getData('text')
        const fromCard = JSON.parse(text)
        const toCard = {name: null, belong: IN_FOUNDATION, belongIndex: foundation}
        if (isMovable(fromCard, toCard)) {
            onMove(fromCard, toCard)
        }
    }

    const dropEvents = card ? null : {
        onDragOver: handleDragOver,
        onDrop: handleDrop
    }

    return (
        <div
            className="foundation"
            {...dropEvents}
        >
            {
                card ? (
                    <Card
                        card={card}
                        foundation={foundation}
                        className="foundation__card"
                        onMove={onMove}
                    ></Card>
                ) : null
            }
        </div>
    )
}
