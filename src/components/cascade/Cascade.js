import React from 'react'
import './Cascade.css'
import Card from '../card/Card'
import EmptyCascade from '../emptyCascade/EmptyCascade'
import { deepClone } from '../../utils'

export default function Cascade(props) {
  const { cards, cascadeKey, onMove } = props
  let templateCards = deepClone(cards)

  const content =
    cards.length === 0 ? (
      <EmptyCascade cascadeKey={cascadeKey} onMove={onMove}></EmptyCascade>
    ) : (
      // cards.map((card, index) => {
      //   return (
      //     <Card
      //       card={card}
      //       cascade={cascadeKey}
      //       index={index}
      //       key={card.name + index}
      //       onMove={onMove}
      //     ></Card>
      //   )
      // })

      templateCards.reverse().reduce(
        (accu, card, index) => (
          <Card
            card={card}
            className="cascade__card"
            cascade={cascadeKey}
            index={index}
            key={card.name + index}
            onMove={onMove}
          >
            {accu}
          </Card>
        ),
        null
      )
    )

  return <div className="cascade">{content}</div>
}
