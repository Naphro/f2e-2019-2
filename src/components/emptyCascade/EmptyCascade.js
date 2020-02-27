import React from 'react'
import { IN_CASCADE } from '../../costants'
import { isMovable } from '../../utils'
import './EmptyCascade.css'

export default function EmptyCascade({ cascadeKey, onMove }) {
  const handleDragOver = event => {
    event.preventDefault()
  }

  const handleDrop = event => {
    event.preventDefault()
    const text = event.dataTransfer.getData('text')
    const fromCard = JSON.parse(text)
    const toCard = { name: null, belong: IN_CASCADE, belongIndex: cascadeKey }

    if (isMovable(fromCard, toCard)) {
      onMove(fromCard, toCard)
    }
  }

  return (
    <div
      className="empty-cascade"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    ></div>
  )
}
