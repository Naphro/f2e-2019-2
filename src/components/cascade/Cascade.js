import React from 'react'
import './Cascade.css'
import Card from '../card/Card'

export default function Cascade({cards, cascadeKey, onMove}) {
    return (
        <div className="cascade">
            {
                cards.map((card, index) => {
                    return (
                        <Card
                            card={card}
                            className="cascade__card"
                            cascade={cascadeKey}
                            index={index}
                            key={card.name}
                            onMove={onMove}
                        ></Card>
                    )
                })
            }
        </div>
    )
}
