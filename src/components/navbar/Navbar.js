import React from 'react'
import svgMap from '../../svgs'

export default function Navbar({onNew, onRestart, onUndo}) {
    return (
        <nav className="sidenav">
            <img src={svgMap['./new_game.svg']} alt="new game" onClick={onNew}/>
            <img src={svgMap['./restart.svg']} alt="restart" onClick={onRestart}/>
            {/*<img src={svgMap['./undo.svg']} alt="undo" style={{opacity: 0.25}} onClick={onUndo}/>*/}
        </nav>
    )
}
