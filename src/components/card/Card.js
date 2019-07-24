import React, {useState} from 'react'
import svgMap from "../../svgs";

export default function Card({card, className, index}) {

    const [style, setStyle] = useState({top: (index * 30) + 'px'});

    const handleDragEnter = (event) => {
        console.log('enter...')
        event.preventDefault();
        event.stopPropagation();
        // setStyle({...style, border: '3px solid yellow'});

        event.dataTransfer.setData('text/plain', event.target.id)
        console.log('enter', event)
    }

    const handleDragOver = (event) => {
        event.preventDefault();
        console.log('over...')
        return false;
    }

    const handleDragLeave = (event) => {
        console.log('leave...')
        event.preventDefault();
        // setStyle({...style, border: 'none'});
    }

    const handleDrop = (event) => {
        event.persist();
        console.log('drop...')
    }

    const events = card.draggable ? {
        onDragEnter: handleDragEnter,
        onDragLeave: handleDragLeave,
        onDragOver: handleDragOver,
        onDrop: handleDrop
    } : null;

    return (
        <img id={card.name}
             className={className}
             style={style}
             src={svgMap['./cards/' + card.name + '.svg']}
             alt="card"
             draggable={card.draggable}
             {...events}
        />
    )
}