import React from 'react'
import './Cascade.css'
import Card from '../card/Card'

export default function Cascade({cards}) {
    return (
        <div className="cascade">
            {
                cards.map((card, index) => {
                    // console.log(card.name, index)
                    return <Card card={card} className="cascade__card" index={index} key={card.name + index}></Card>
                })
                // cards.reverse().reduce((prevCards, card) => {
                //     return <Card card={card} className="cascade__card" key={card.name}>{prevCards}</Card>
                // }, null)
            }
        </div>
    )
}