import '../../helpers/arrayHelpers';
import './Scrabble.scss';

import React, { Component } from 'react';
import HTML5Backend         from 'react-dnd-html5-backend';
import { DragDropContext }  from 'react-dnd';

import FlipMove             from 'react-flip-move';
import Toggle               from '../Toggle';
import Tile                 from '../Tile';
import BoardSquare          from '../BoardSquare';
import ApiService           from '../../services/ApiService';

const INITIAL_TILES = [
    { id: 1, letter: '*', x: 0, y: 1 },
    { id: 1, letter: '*', x: 1, y: 1 },
    { id: 2, letter: '*', x: 2, y: 1 },
    { id: 3, letter: '*', x: 3, y: 1 },
    { id: 4, letter: '*', x: 4, y: 1 },
    { id: 5, letter: '*', x: 5, y: 1 },
    { id: 6, letter: '*', x: 6, y: 1 },
    { id: 7, letter: '*', x: 7, y: 1 },
    { id: 8, letter: '*', x: 8, y: 1 },
    { id: 9, letter: '*', x: 9, y: 1 },
    { id: 10, letter: '*', x: 10, y: 1 }
];

const BOARD_WIDTH   = 11;
const BOARD_HEIGHT  = 2;

let tiles = [];

@DragDropContext(HTML5Backend)
class Scrabble extends Component {
    constructor(props) {
        super(props);
        this.state = { tiles: INITIAL_TILES };

        this.updateDroppedTilePosition = this.updateDroppedTilePosition.bind(this);
        this.resetTiles = this.resetTiles.bind(this);
        this.newTiles = this.newTiles.bind(this);
        this.submit = this.submit.bind(this);
    }

    componentWillMount(){
        this.newTiles();
    }

    updateDroppedTilePosition({x, y}, tile) {
        // Normally, this would be done through a Redux action, but because this
        // is such a contrived example, I'm just passing the action down through
        // the child.

        // Create a copy of the state, find the newly-dropped tile.
        let stateTiles = this.state.tiles.slice();
        const index = stateTiles.findIndex( stateTile => stateTile.id === tile.id );

        // Set it to a new copy of the tile, but with the new coords
        stateTiles[index] = { ...tile, x, y };
        this.setState({ tiles: stateTiles });
    }

    resetTiles() {
        this.setState({ tiles });
    }

    newTiles(){
        this.setState({ tiles: INITIAL_TILES }, () => {
            ApiService.getWord().then( res => {
                tiles = res.slice();
                const missing = INITIAL_TILES.slice(res.length);
                missing.forEach(d => d.hide = true);
                this.setState({ tiles: res.concat(missing) });
            }).catch( (ex) =>{
                console.log(`Error on API: ${ex}`);
                this.setState({ tiles: INITIAL_TILES });
            });
        });
    }

    submit(){
        let stateTiles = this.state.tiles.map( tile => {
            if(tile.letter !== '*'){
                if(tile.y === 0 && tile.id === tile.x){
                    tile.classname = 'tile-good';
                }else{
                    tile.classname = 'tile-wrong';
                }
            }
            return tile;
        });
        this.setState({ tiles: stateTiles });
    }

    renderTiles() {
        return this.state.tiles.map( (tile, index) => {
            return (
                <Tile
                  key={index}
                  onDrop={this.updateDroppedTilePosition}
                  {...tile}
                />
            );
        });
    }

    renderBoardSquares() {
        // Create a 2D array to represent the board
        // Array#matrix is a monkeypatched, custom method >:)
        const matrix = Array.matrix(BOARD_WIDTH, BOARD_HEIGHT);

        return matrix.map( (row, rowIndex) => (
            row.map( (index) => {
                return (
                    <BoardSquare
                      x={index}
                      y={rowIndex}
                      onDrop={this.updateDroppedTilePosition}
                    />
                );
            })
        ));
    }

    render() {
        return (
            <div id="scrabble">
              <div className="board-border">
                <div key="scrabble-board" className="board">
                  <FlipMove duration={200} staggerDelayBy={150}>
                    { this.renderTiles() }
                  </FlipMove>
                  { this.renderBoardSquares() }
                </div>
              </div>

              <div className="controls">
                <Toggle
                  clickHandler={this.submit}
                  text="Submit" icon="submit"
                  active={true}
                  large={true}
                />
                <Toggle
                  clickHandler={this.resetTiles}
                  text="Reset" icon="refresh"
                  active={true}
                  large={true}
                />
                <Toggle
                  clickHandler={this.newTiles}
                  text="Next word" icon="next"
                  active={true}
                  large={true}
                />
              </div>
            </div>
        );
    }
};

export default Scrabble;
