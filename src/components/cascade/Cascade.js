import React from 'react'
import './Cascade.css'
import svgMap from '../../svgs'

export default function Cascade({cards}) {
    return (
        <div className="cascade">
            {
                cards.map(card => {
                    return (
                        <div className="cascade__card" key={card}>
                            <img src={svgMap['./cards/' + card + '.svg']} alt="card"/>
                        </div>
                    )
                })
            }
        </div>
    )
}