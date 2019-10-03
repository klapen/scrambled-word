import PropTypes            from 'proptypes';
import React, { Component } from 'react';

import {
    DragSource,
    DropTarget
}                           from 'react-dnd';

const SQUARE_SIZE   = 56;
const TILE_OFFSET   = 2;

const tileSource = {
    beginDrag(props) { return props; }
};

const tileTarget = {
    drop(props, monitor) {
        const tile1 = props;
        const tile2 = monitor.getItem();
        props.onDrop(tile1, tile2);
        props.onDrop(tile2, tile1);
    }
}

@DropTarget('tile', tileTarget, (connect, monitor) => ({
    connectDropTarget:  connect.dropTarget(),
    isOver:             monitor.isOver()
}))
@DragSource('tile', tileSource, (connect, monitor) => ({
    connectDragSource:  connect.dragSource(),
    isDragging:         monitor.isDragging()
}))
class Tile extends Component {
    static propTypes = {
        x:                  PropTypes.number.isRequired,
        y:                  PropTypes.number.isRequired,
        id:                 PropTypes.number.isRequired,
        letter:             PropTypes.string.isRequired,
        connectDragSource:  PropTypes.func.isRequired,
        isDragging:         PropTypes.bool.isRequired
    };

    render() {
        const {
            connectDropTarget, connectDragSource, isDragging, letter, x, y, hide, classname
        } = this.props;

        const styles = {
            left:     x * SQUARE_SIZE + TILE_OFFSET/2,
            top:      y * SQUARE_SIZE,
            zIndex:   `${x+1}${y+1}`,
            opacity:  hide ? 0 : isDragging ? 0.5 : 1,
            display:  hide ? 'none' : 'block'
        };

        let tileClassname = 'tile';
        if(classname) tileClassname += ` ${classname}`;

        return connectDropTarget(connectDragSource(
            <div className={tileClassname} style={styles}>
              <span className="tile-letter">{letter}</span>
            </div>
        ));
    }
}

export default Tile;
