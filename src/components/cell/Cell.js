import React from 'react'
import './Cell.css'
import { IN_CELL } from '../../costants'
import { isMovable } from '../../utils'
import Card from '../card/Card'

export default function Cell({ cards, cell, onMove }) {
  const empty = cards.length === 0 ? true : false

  const handleDragOver = event => {
    event.preventDefault()
  }

  const handleDrop = event => {
    event.preventDefault()
    const text = event.dataTransfer.getData('text')
    const fromCard = JSON.parse(text)
    const toCard = { name: null, belong: IN_CELL, belongIndex: cell }

    if (isMovable(fromCard, toCard)) {
      onMove(fromCard, toCard)
    }
  }

  const dropEvents = empty
    ? {
        onDragOver: handleDragOver,
        onDrop: handleDrop,
      }
    : null

  const content = empty ? (
    <div className="cell__content"></div>
  ) : (
    <Card card={cards[0]} className="cell__card" onMove={onMove}></Card>
  )

  return (
    <div className="cell" {...dropEvents}>
      {content}
    </div>
  )
}
