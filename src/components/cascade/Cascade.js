import React from 'react'
import './Cascade.css'
import Card from '../card/Card'
import EmptyCascade from '../emptyCascade/EmptyCascade'

export default function Cascade ({cards, cascadeKey, onMove}) {

    const content = cards.length === 0 ? (
        <EmptyCascade
            cascadeKey={cascadeKey}
            onMove={onMove}
        ></EmptyCascade>
    ) : (
        cards.map((card, index) => {
            return (
                <Card
                    card={card}
                    className="cascade__card"
                    cascade={cascadeKey}
                    index={index}
                    key={card.name + index}
                    onMove={onMove}
                ></Card>
            )
        })
    )

    return (
        <div className="cascade">{content}</div>
    )
}
