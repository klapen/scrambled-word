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
import StorageService       from '../../services/StorageService';

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
        this.state = {
            tiles: INITIAL_TILES,
            submit: false,
            reset: false,
            score: StorageService.getScore(),
            audioUrl: '',
            answer: '***********'
        };

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
        this.setState({ tiles: INITIAL_TILES, answer: '*'.repeat(11) }, () => {
            setTimeout( () => {
                ApiService.getWord().then( res => {
                    tiles = res.word.slice();
                    console.log('respuesta ', res.word.sort( (a,b) => a.id > b.id));
                    const missing = INITIAL_TILES.slice(res.word.length);
                    missing.forEach(d => d.hide = true);
                    this.setState({
                        tiles: res.word.concat(missing),
                        submit: false,
                        reset: false,
                        audioUrl: res.audioUrl || '',
                        answer: '*'.repeat(tiles.length)
                    });
                }).catch( (ex) =>{
                    console.log(`Error on API: ${ex}`);
                    this.setState({ tiles: INITIAL_TILES, submit: true, reset: true });
                });
            }, 1500);
        });
    }

    submit(){
        let score = 0;
        let stateTiles = this.state.tiles.map( tile => {
            if(tile.letter !== '*'){
                if(tile.y === 0 && tile.id === tile.x){
                    score += 1;
                    tile.classname = 'tile-good';
                }else{
                    tile.classname = 'tile-wrong';
                }
            }
            return tile;
        });

        if(tiles.length === score){
            score = StorageService.addToScore(1);
        }else{
            score = StorageService.getScore();
        }
        const answer = tiles.sort( (a,b) => a.id > b.id).map( (c) => c.letter).join('');
        this.setState({ tiles: stateTiles, submit: true, reset: true, score, answer });
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
                      isBackColorWhite={rowIndex % 2}
                    />
                );
            })
        ));
    }

    render() {
        const audioStyle = {
            display:  !this.state.audioUrl ? 'none' : ''
        };
        return (
            <div id="scrabble">
              <div className="row mt-2 justify-content-md-center">
                <div id="instructions" className="col-8">
                  <p><strong>Instructions:</strong> The audio will present you with the English word pronunciation to guess. In the second row, you will find a pool of scrambled from that word's spelling. Just move each letter to the first row in the correct place. If you want to start again, just click on the Reset button. After you finish, you can submit your answer to check the spelling. Just keep in mind that all the letters in the grey row will be consider as wrong. To get a new word, just click the Next word button. Enjoy playing!!</p>
                </div>
              </div>
              <div className="row mt-2 align-items-center">
                <div className="col col-lg-7">
                  <p>Answer: {this.state.answer}</p>
                </div>
                <div className="col col-lg-2">
                  <p>Your score is: <strong>{this.state.score}</strong></p>
                </div>
              </div>
              <div className="row justify-content-md-center">
                <div key="scrabble-board" className="board">
                  <FlipMove duration={200} staggerDelayBy={150}>
                    { this.renderTiles() }
                  </FlipMove>
                  { this.renderBoardSquares() }
                </div>
              </div>
              
              <div className="row mt-2 align-items-center">
                <div className="col col-lg-6">
                  <p className="float-right">Play the audio to listen to the word</p>
                </div>
                <div className="col col-lg-2">
                  <audio className="float-left" controls
                         src={this.state.audioUrl}
                         type="audio/mpeg"
                  ></audio>
                </div>
              </div>
              <div className="row mt-2 justify-content-md-center">
                <div className="col-2">
                  <Toggle
                    clickHandler={this.submit}
                    text="Submit" icon="submit"
                    active={false}
                    large={false}
                    disable={this.state.submit}
                  />
                </div>
                <div className="col-1">
                  <Toggle
                    clickHandler={this.resetTiles}
                    text="Reset" icon="refresh"
                    active={true}
                    large={true}
                    disable={this.state.reset}
                  />
                </div>
                <div className="col-3">
                  <Toggle
                    clickHandler={this.newTiles}
                    text="Next word" icon="next"
                    active={true}
                    large={true}
                  />
                </div>
              </div>
            </div>
        );
    }
};

export default Scrabble;
