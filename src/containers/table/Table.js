import React from 'react'
// import classes from "./Table.css"
import './Table.css'
import Foundation from '../../components/foundation/Foundation'
import Cell from '../../components/cell/Cell'
import Cascade from '../../components/cascade/Cascade'
import Navbar from '../../components/navbar/Navbar'
import { isMovable, deepClone } from '../../utils'
import {
  IN_FOUNDATION,
  IN_CASCADE,
  IN_CELL,
  MAX_CARD_SIZE,
} from '../../costants'

export default class Table extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cells: new Array(4).fill([]),
      foundations: new Array(4).fill([]),
      decks: [],
      cascades: [],
    }
    this.handleNew = this.handleNew.bind(this)
    this.handleRestart = this.handleRestart.bind(this)
  }

  shuffle() {
    const cards = ['club', 'diamond', 'heart', 'spade']
      .map(shape => {
        return new Array(13).fill(null).map((value, index) => {
          return shape + (index + 1)
        })
      })
      .flat()

    const decks = []
    let length = MAX_CARD_SIZE
    while (length > 0) {
      const n = Math.floor(Math.random() * length)
      decks.push({
        name: cards.splice(n, 1)[0],
        draggable: false,
        droppable: false,
        belong: IN_CASCADE,
        belongIndex: null,
      })
      length--
    }

    this.setState(
      {
        ...this.state,
        decks: decks,
      },
      () => {
        this.deal()
      }
    )
  }

  deal() {
    let cloneDecks = [...this.state.decks]
    const emptyCascades = [7, 7, 7, 7, 6, 6, 6, 6]
    const cascades = emptyCascades.map((size, index) => {
      return cloneDecks.splice(0, size).map(card => ({
        ...card,
        draggable: false,
        droppable: false,
        belong: IN_CASCADE,
        belongIndex: index,
      }))
    })

    this.setState(
      {
        ...this.state,
        cascades: cascades,
        cells: new Array(4).fill([]),
        foundations: new Array(4).fill([]),
      },
      () => {
        this.checkDraggable()
      }
    )
  }

  checkDraggable() {
    const checkedCascades = this.state.cascades.map(cascade => {
      let prevCard = null
      let draggable = true

      const reversedCascade = cascade.reverse().map((card, index) => {
        if (draggable) {
          draggable = !prevCard || isMovable(prevCard, card)
          prevCard = card
        }

        return {
          ...card,
          draggable: draggable,
          droppable: index === 0,
        }
      })
      return reversedCascade.reverse()
    })

    this.setState(
      {
        ...this.state,
        cascades: checkedCascades,
      },
      this.doesWin
    )
  }

  handleNew() {
    this.shuffle()
  }

  handleRestart() {
    this.deal()
  }

  handleUndo() {}

  handleMove = (fromCard, toCard) => {
    switch (toCard.belong) {
      case IN_CASCADE:
        this.moveToCascade(fromCard, toCard)
        break
      case IN_FOUNDATION:
        this.moveToFoundation(fromCard, toCard)
        break
      case IN_CELL:
        this.moveToCell(fromCard, toCard)
        break
      default:
    }
  }

  // afterMove = () => {
  //     if (!this.doesWin) {
  //         this.checkDraggable()
  //     }
  // }

  doesWin = () => {
    const finishCounts = this.state.foundations.reduce((sum, foundation) => {
      return sum + foundation.length
    }, 0)

    if (finishCounts === MAX_CARD_SIZE) {
      alert('YOU WIN !')
      return true
    } else {
      return false
    }
  }

  moveToCascade = (fromCard, toCard) => {
    const fromRegionIdx = fromCard.belongIndex
    const toRegionIdx = toCard.belongIndex

    if (fromCard.belong === IN_CASCADE) {
      const fromCards = this.state.cascades[fromRegionIdx]
      const oldIndex = fromCards.map(card => card.name).indexOf(fromCard.name)
      const newCascades = deepClone(this.state.cascades)
      const moveCards = fromCards
        .slice(oldIndex)
        .map(card => ({ ...card, belongIndex: toRegionIdx }))
      newCascades[toRegionIdx] = newCascades[toRegionIdx].concat(moveCards)
      newCascades[fromRegionIdx] = newCascades[fromRegionIdx].filter(card => {
        return !moveCards.some(move => card.name === move.name)
      })

      this.setState(
        {
          ...this.state,
          cascades: newCascades,
        },
        this.checkDraggable
      )
    } else if (fromCard.belong === IN_CELL) {
      const fromCard = this.state.cells[fromRegionIdx][0]
      const newCascades = deepClone(this.state.cascades)
      const newCells = deepClone(this.state.cells)
      const moveCard = {
        ...fromCard,
        droppable: true,
        draggable: true,
        belong: IN_CASCADE,
        belongIndex: toCard.belongIndex,
      }
      newCascades[toRegionIdx].push(moveCard)
      newCells[fromRegionIdx].pop()

      this.setState(
        {
          ...this.state,
          cascades: newCascades,
          cells: newCells,
        },
        this.checkDraggable
      )
    }
  }

  moveToFoundation = (fromCard, toCard) => {
    const fromRegionIdx = fromCard.belongIndex
    const toRegionIdx = toCard.belongIndex

    if (fromCard.belong === IN_CELL) {
      const fromCard = this.state.cells[fromRegionIdx][0]
      const newFoundations = deepClone(this.state.foundations)
      const newCells = deepClone(this.state.cells)
      const moveCard = {
        ...fromCard,
        draggable: false,
        droppable: true,
        belong: IN_FOUNDATION,
        belongIndex: toRegionIdx,
      }

      newFoundations[toRegionIdx].push(moveCard)
      newCells[fromRegionIdx].pop()

      this.setState(
        {
          ...this.state,
          foundations: newFoundations,
          cells: newCells,
        },
        this.checkDraggable
      )
    } else if (fromCard.belong === IN_CASCADE) {
      const fromCards = this.state.cascades[fromRegionIdx]
      const oldIndex = fromCards.map(card => card.name).indexOf(fromCard.name)

      if (oldIndex === fromCards.length - 1) {
        const newCascades = deepClone(this.state.cascades)
        const newFoundations = deepClone(this.state.foundations)
        const moveCards = fromCards.slice(oldIndex).map(card => ({
          ...card,
          draggable: false,
          droppable: true,
          belong: IN_FOUNDATION,
          belongIndex: toRegionIdx,
        }))

        newFoundations[toRegionIdx] = newFoundations[toRegionIdx].concat(
          moveCards
        )
        newCascades[fromRegionIdx] = newCascades[fromRegionIdx].filter(card => {
          return !moveCards.some(move => card.name === move.name)
        })

        this.setState(
          {
            ...this.state,
            foundations: newFoundations,
            cascades: newCascades,
          },
          this.checkDraggable
        )
      }
    }
  }

  moveToCell = (fromCard, toCard) => {
    const fromRegionIdx = fromCard.belongIndex
    const toRegionIdx = toCard.belongIndex
    const fromCards = this.state.cascades[fromRegionIdx]
    const oldIndex = fromCards.map(card => card.name).indexOf(fromCard.name)

    if (oldIndex === fromCards.length - 1) {
      const newCascades = deepClone(this.state.cascades)
      const newCells = deepClone(this.state.cells)
      const moveCards = fromCards.slice(oldIndex).map(card => ({
        ...card,
        draggable: true,
        droppable: false,
        belong: IN_CELL,
        belongIndex: toRegionIdx,
      }))
      newCells[toRegionIdx] = newCells[toRegionIdx].concat(moveCards)
      newCascades[fromRegionIdx] = newCascades[fromRegionIdx].filter(card => {
        return !moveCards.some(move => card.name === move.name)
      })

      this.setState(
        {
          ...this.state,
          cells: newCells,
          cascades: newCascades,
        },
        this.checkDraggable
      )
    }
  }

  componentDidMount() {}

  render() {
    return (
      <div className="playground">
        <Navbar
          onNew={this.handleNew}
          onRestart={this.handleRestart}
          onUndo={this.handleUndo}
        ></Navbar>
        <header className="header"></header>
        <main className="main">
          <div className="storages">
            {this.state.cells.map((item, index) => (
              <Cell
                key={index}
                cell={index}
                cards={item}
                onMove={this.handleMove}
              ></Cell>
            ))}
            {this.state.foundations.map((item, index) => (
              <Foundation
                key={index}
                foundation={index}
                cards={item}
                onMove={this.handleMove}
              ></Foundation>
            ))}
          </div>
          <div className="cascades">
            {this.state.cascades.map((item, index) => (
              <Cascade
                key={index}
                cascadeKey={index}
                cards={item}
                onMove={this.handleMove}
              ></Cascade>
            ))}
          </div>
        </main>
      </div>
    )
  }
}
