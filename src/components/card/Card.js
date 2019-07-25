import React, {useState} from 'react'
import svgMap from "../../svgs";
import {isMovable, isFoundationMovable} from '../../utils'
import constant from '../../costants'

export default function Card({card, className, index, onMove, onMoveToFoundation}) {

    const [style, setStyle] = useState({top: (index * 30) + 'px'});

    const handleDragStart = (event) => {
        event.dataTransfer.setData('text/plain', JSON.stringify(card))
    }

    const handleDragOver = (event) => {
        event.preventDefault();
    }

    const handleDrop = (event) => {
        const text = event.dataTransfer.getData('text');
        const fromCard = JSON.parse(text);
        const toCard = card;
        console.log(fromCard, toCard)
        switch (card.belong) {
            case constant.IN_CASCADE:
                if (isMovable(fromCard.name, toCard.name)) {
                    onMove(fromCard.belongIndex, toCard.belongIndex, fromCard.name)
                }
                break;
            case constant.IN_FOUNDATION:
                // if (isFoundationMovable(fromCard.name, toCard.name)) {
                //     onMoveToFoundation(fromCard.belongIndex, toCard.belongIndex, fromCard.name)
                // }
                break;
            case constant.IN_CELL:
                break;
            default:
        }
    }

    const isDraggable = card.draggable && card.belong === constant.IN_CASCADE;

    const dragEvents = isDraggable ? {
        onDragStart: handleDragStart,
        onDragOver: handleDragOver,
    } : null;

    const dropEvents = isDraggable ? {
        onDrop: handleDrop
    } : null;

    return (
        <img className={className}
             style={style}
             src={svgMap['./cards/' + card.name + '.svg']}
             alt="card"
             draggable={isDraggable}
             {...dragEvents}
             {...dropEvents}
        />
    )
}
