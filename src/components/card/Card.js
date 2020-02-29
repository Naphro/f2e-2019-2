import React, { useState } from 'react'
import svgMap from '../../svgs'
import { isMovable } from '../../utils'
import './Card.css'

export default function Card(props) {
  const { card, onMove, className, children } = props

  const handleDragStart = event => {
    event.stopPropagation()
    event.dataTransfer.setData('text/plain', JSON.stringify(card))
  }

  const handleDragOver = event => {
    event.preventDefault()
  }

  const handleDrop = event => {
    const text = event.dataTransfer.getData('text')
    const fromCard = JSON.parse(text)
    const toCard = card

    if (isMovable(fromCard, toCard)) {
      onMove(fromCard, toCard)
    }
  }

  const dragEvents = card.draggable
    ? {
        onDragStart: handleDragStart,
      }
    : null

  const dropEvents = card.droppable
    ? {
        onDragOver: handleDragOver,
        onDrop: handleDrop,
      }
    : null

  return (
    <div
      className={`${className ? className : ''} card`}
      draggable={card.draggable}
      {...dragEvents}
      {...dropEvents}
    >
      <img
        src={svgMap['./cards/' + card.name + '.svg']}
        alt="card"
        draggable={false}
      />
      {children}
    </div>
  )
}
