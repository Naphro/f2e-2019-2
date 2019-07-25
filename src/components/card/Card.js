import React, {useState} from 'react'
import svgMap from "../../svgs";
import { isDraggable } from '../../utils'

export default function Card({card, className, cascade, index, onMove}) {

    const [style, setStyle] = useState({top: (index * 30) + 'px'});

    const handleDragStart = (event) => {
        event.dataTransfer.setData('text/plain', event.target.name + ':' + event.target.id)
    }

    const handleDragEnter = (event) => {
        event.preventDefault();
        // setStyle({...style, border: '3px solid yellow'});
    }

    const handleDragOver = (event) => {
        event.preventDefault();
    }

    const handleDragLeave = (event) => {
        event.preventDefault();
    }

    const handleDrop = (event) => {
        const toCascade = cascade
        const toCardname = card.name
        const [fromCascade, fromCardname] = event.dataTransfer.getData('text').split(':')
        if (isDraggable(toCardname, fromCardname)) {
            onMove(fromCascade, toCascade, fromCardname)
        }
    }

    const events = card.draggable ? {
        onDragStart: handleDragStart,
        onDragEnter: handleDragEnter,
        onDragLeave: handleDragLeave,
        onDragOver: handleDragOver,
        onDrop: handleDrop
    } : null;

    return (
        <img id={card.name}
             name={cascade}
             className={className}
             style={style}
             src={svgMap['./cards/' + card.name + '.svg']}
             alt="card"
             draggable={card.draggable}
             {...events}
        />
    )
}
