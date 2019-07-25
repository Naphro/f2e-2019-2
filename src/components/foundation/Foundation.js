import React from 'react'
import Card from '../card/Card'
import './Foundation.css'
import {isFoundationMovable} from "../../utils";

export default function Foundation({foundation, onMoveToFoundation, cards}) {
    const card = cards.length === 0 ? null : cards[cards.length - 1];

    const handleDragOver = (event) => {
        event.preventDefault();
    }

    const handleDrop = (event) => {
        event.preventDefault();
        const toFoundation = foundation
        const text = event.dataTransfer.getData('text')
        const fromCard = JSON.parse(text)
        console.log('handleDrop in foundation', fromCard, toFoundation)
        if (isFoundationMovable(fromCard.name, card ? card.name : null)) {
            console.log('isFoundationMovable...')
            onMoveToFoundation(fromCard.belongIndex, toFoundation, fromCard.name)
        }
    }

    const handleMove = (event) => {

    }

    const dropEvents = {
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
                        onMove={handleMove()}
                    ></Card>
                ) : null
            }
        </div>
    )
}
