import React from 'react'
// import classes from "./Table.css"
import './Table.css'
import Foundation from '../../components/foundation/Foundation'
import Cell from '../../components/cell/Cell'
import Cascade from '../../components/cascade/Cascade'
import Navbar from '../../components/navbar/Navbar'
import { isDraggable } from '../../utils'

const MAX_CARD_SIZE = 52

export default class Table extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            cells: new Array(4).fill(null),
            foundations: new Array(4).fill(null),
            decks: [],
            cascades: []
        }
        this.handleNew = this.handleNew.bind(this)
        this.handleRestart = this.handleRestart.bind(this)
    }

    shuffle () {
        const cards = ['club', 'diamond', 'heart', 'spade'].map(shape => {
            return new Array(13).fill(null).map((value, index) => {
                return shape + (index + 1)
            })
        }).flat()

        const decks = []
        let length = MAX_CARD_SIZE
        while (length > 0) {
            const n = Math.floor(Math.random() * length)
            decks.push({name: cards.splice(n, 1)[0], draggable: false})
            length--
        }

        console.log(decks)
        this.setState({
            ...this.state,
            decks: decks
        }, () => {
            this.deal()
        })
    }

    deal () {
        let cloneDecks = [...this.state.decks]
        console.log(cloneDecks)
        const emptyCascades = [7, 7, 7, 7, 6, 6, 6, 6]
        const cascades = emptyCascades.map(size => {
            return cloneDecks.splice(0, size)
        })
        this.setState({
            ...this.state,
            cascades: cascades
        }, () => {
            this.checkDraggable()
        })
    }

    checkDraggable () {
        const checkedCascades = this.state.cascades.map(cascade => {
            let prevCard = null
            let draggable = true
            const reversedCascade = cascade.reverse().map(card => {
                if (draggable) {
                    draggable = (!prevCard || isDraggable(card.name, prevCard.name))
                    prevCard = card
                }
                return {...card, draggable: draggable}
            })
            return reversedCascade.reverse()
        })

        this.setState({
            ...this.state,
            cascades: checkedCascades
        })
    }

    handleNew () {
        this.shuffle()
    }

    handleRestart () {
        this.deal()
    }

    handleUndo () {

    }

    handleMove = (from, to, card) => {
        const newCascades = this.deepClone(this.state.cascades)
        const fromCards = this.state.cascades[from]
        const oldIndex = fromCards.map(card => card.name).indexOf(card)

        const moveCards = fromCards.slice(oldIndex)
        newCascades[to] = newCascades[to].concat(moveCards)
        newCascades[from] = newCascades[from].filter(card => {
            return !moveCards.some(move => card.name === move.name)
        })
        this.setState({
            ...this.state,
            cascades: newCascades
        }, this.checkDraggable)
    }

    componentDidMount () {

    }

    deepClone (obj) {
        return JSON.parse(JSON.stringify(obj))
    }

    render () {
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
                        {
                            this.state.cells.map((item, index) => (<Cell key={index}></Cell>))
                        }
                        {
                            this.state.foundations.map((item, index) => (<Foundation key={index}></Foundation>))
                        }
                    </div>
                    <div className="cascades">
                        {
                            this.state.cascades.map((item, index) => (
                                <Cascade key={index} cards={item} cascadeKey={index} onMove={this.handleMove}></Cascade>)
                            )
                        }
                    </div>
                </main>
            </div>
        )
    }
}
