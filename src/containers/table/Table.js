import React from "react"
// import classes from "./Table.css"
import './Table.css'
import Foundation from '../../components/foundation/Foundation'
import Cell from '../../components/cell/Cell'
import Cascade from '../../components/cascade/Cascade'
import svgMap from '../../svgs'

const MAX_CARD_SIZE = 52;

export default class Table extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cells: new Array(4).fill(null),
            foundations: new Array(4).fill(null),
            cascades: []
        }
    }

    shuffle() {
        const cards = ['club', 'diamond', 'heart', 'spade'].map(shape => {
            return new Array(13).fill(null).map((value, index) => {
                return shape + (index + 1);
            })
        }).flat();

        const decks = [];
        let length = MAX_CARD_SIZE;
        while (length > 0) {
            const n = Math.floor(Math.random() * length);
            decks.push(cards.splice(n, 1)[0]);
            length--;
        }

        const cascades = [7, 7, 7, 7, 6, 6, 6, 6];

        return cascades.map(size => {
            return decks.splice(0, size);
        })
    }

    handleNewGame() {
        const cards = this.shuffle();
        this.setState({
            ...this.state,
            cascades: cards
        }, () => console.log(this.state.cascades))
    }

    componentDidMount() {
        this.handleNewGame();
        console.log(svgMap)
    }

    render() {
        return (
            <div className="playground">
                <nav className="sidenav">
                    <img src={svgMap['./new_game.svg']} alt="new game"/>
                    <img src={svgMap['./restart.svg']} alt="restart"/>
                    <img src={svgMap['./undo.svg']} alt="undo" style={{opacity: 0.25}}/>
                </nav>
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
                                <Cascade key={index} cards={item}></Cascade>)
                            )
                        }
                    </div>
                </main>
            </div>
        )
    }
}
