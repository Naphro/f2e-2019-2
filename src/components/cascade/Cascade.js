import React from 'react'
import './Cascade.css'
import Card from '../card/Card'

export default function Cascade({cards, cascadeKey, onMove}) {
    return (
        <div className="cascade">
            {
                cards.map((card, index) => {
                    // console.log(card.name, index)
                    return <Card card={card} className="cascade__card" cascade={cascadeKey} index={index} key={card.name + index} onMove={onMove}></Card>
                })
                // cards.reverse().reduce((prevCards, card) => {
                //     return <Card card={card} className="cascade__card" key={card.name}>{prevCards}</Card>
                // }, null)
            }
        </div>
    )
}
