import React from 'react'
// import classes from "./Table.css"
import './Table.css'
import Foundation from '../../components/foundation/Foundation'
import Cell from '../../components/cell/Cell'
import Cascade from '../../components/cascade/Cascade'
import Navbar from '../../components/navbar/Navbar'
import {isMovable, deepClone} from '../../utils'
import constant from '../../costants'

export default class Table extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cells: new Array(4).fill([]),
            foundations: new Array(4).fill([]),
            decks: [],
            cascades: []
        }
        this.handleNew = this.handleNew.bind(this)
        this.handleRestart = this.handleRestart.bind(this)
    }

    shuffle() {
        const cards = ['club', 'diamond', 'heart', 'spade'].map(shape => {
            return new Array(13).fill(null).map((value, index) => {
                return shape + (index + 1)
            })
        }).flat()

        const decks = [];
        let length = constant.MAX_CARD_SIZE;
        while (length > 0) {
            const n = Math.floor(Math.random() * length)
            decks.push({
                name: cards.splice(n, 1)[0],
                draggable: false,
                belong: constant.IN_CASCADE,
                belongIndex: null
            })
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

    deal() {
        let cloneDecks = [...this.state.decks]
        console.log(cloneDecks)
        const emptyCascades = [7, 7, 7, 7, 6, 6, 6, 6]
        const cascades = emptyCascades.map((size, index) => {
            return cloneDecks.splice(0, size).map(
                card => ({...card, belongIndex: index})
            )
        })
        this.setState({
            ...this.state,
            cascades: cascades,
            cells: new Array(4).fill([]),
            foundations: new Array(4).fill([]),
        }, () => {
            this.checkDraggable()
        })
    }

    checkDraggable() {
        const checkedCascades = this.state.cascades.map(cascade => {
            let prevCard = null
            let draggable = true
            const reversedCascade = cascade.reverse().map(card => {
                if (draggable) {
                    draggable = (!prevCard || isMovable(prevCard.name, card.name))
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

    handleNew() {
        this.shuffle()
    }

    handleRestart() {
        this.deal()
    }

    handleUndo() {

    }

    handleMove = (fromCascade, toCascade, fromCardname) => {
        console.log(fromCascade, toCascade)
        const newCascades = deepClone(this.state.cascades)
        const fromCards = this.state.cascades[fromCascade]
        const oldIndex = fromCards.map(card => card.name).indexOf(fromCardname)

        const moveCards = fromCards.slice(oldIndex)
            .map(card => ({...card, belongIndex: toCascade}))
        newCascades[toCascade] = newCascades[toCascade].concat(moveCards)
        newCascades[fromCascade] = newCascades[fromCascade].filter(card => {
            return !moveCards.some(move => card.name === move.name)
        })

        this.setState({
            ...this.state,
            cascades: newCascades
        }, this.checkDraggable)
    }

    handleMoveToFoundation = (fromCascade, toFoundation, fromCardname) => {
        const newFoundations = deepClone(this.state.foundations)
        const newCascades = deepClone(this.state.cascades)
        const fromCards = this.state.cascades[fromCascade]
        const oldIndex = fromCards.map(card => card.name).indexOf(fromCardname)

        if (oldIndex === fromCards.length - 1) {
            const moveCards = fromCards.slice(oldIndex).map(card => ({
                ...card,
                draggable: false,
                belong: constant.IN_FOUNDATION
            }))
            newFoundations[toFoundation] = newFoundations[toFoundation].concat(moveCards)
            newCascades[fromCascade] = newCascades[fromCascade].filter(card => {
                return !moveCards.some(move => card.name === move.name)
            })

            this.setState({
                ...this.state,
                foundations: newFoundations,
                cascades: newCascades
            }, this.checkDraggable)
        }
    }

    componentDidMount() {

    }

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
                        {
                            this.state.cells.map((item, index) => (<Cell key={index}></Cell>))
                        }
                        {
                            this.state.foundations.map((item, index) => (
                                <Foundation
                                    key={index}
                                    foundation={index}
                                    cards={item}
                                    onMoveToFoundation={this.handleMoveToFoundation}
                                ></Foundation>)
                            )
                        }
                    </div>
                    <div className="cascades">
                        {
                            this.state.cascades.map((item, index) => (
                                <Cascade
                                    key={index}
                                    cascadeKey={index}
                                    cards={item}
                                    onMove={this.handleMove}
                                    onMoveToFoundation={this.handleMoveToFoundation}
                                ></Cascade>)
                            )
                        }
                    </div>
                </main>
            </div>
        )
    }
}
