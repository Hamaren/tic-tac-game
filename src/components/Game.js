import React from 'react';
//import Board from './Board.js';
import './Game.scss';

function Square(props) {
    return(
        <td
            className={'square'}
            onClick={props.onClick}
        >
            {props.value}
        </td>
    )
}

class Board extends React.Component {
    renderTable(){
        let table = [[],[],[]];

        for (let i = 0; i < this.props.squares.length; i++){
            if(i <= 2){
                table[0].push(this.renderSquare(i));
            }
            if(i > 2 && i <=5 ){
                table[1].push(this.renderSquare(i));
            }
            if(i >= 6){
                table[2].push(this.renderSquare(i));
            }
        }

        return table;
    }

    renderSquare(i){
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => {
                    this.props.onClick(i);
                    this.props.check();
                }}
                key={i}
            />
        )
    }

    render(){
        const table = this.renderTable();
        return(
            <table>
                <tbody>
                    {table.map((row, index) => {
                        return(
                            <tr className={'board-row'} key={index}>
                                {
                                    row.map((element) => {
                                        return(
                                            element
                                        )
                                    })
                                }
                            </tr>

                        )
                    })}
                </tbody>

            </table>
        )
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            score: {
                x: 0,
                o: 0,
            },
            stepNumber: 0,
            xIsNext: true,
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares
            }]),
            stepNumber : history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step){
        this.setState({
            stepNumber: step,
            xisNext: (step % 2) === 0
        })
    }

    scoreCheck(){
        const history = this.state.history[this.state.stepNumber];
        const winner = calculateWinner(history.squares);
        console.log(winner);
        if(winner === 'X'){
            this.setState({
                score: {
                    x: this.state.score.x + 1,
                    o: this.state.score.o,
                }
            })
        }
        if(winner === 'O'){
            this.setState({
                score: {
                    x: this.state.score.x,
                    o: this.state.score.o + 1,
                }
            })
        }
    }

    render(){
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const moves = history.map((step, move) => {
            const desc = move ? `To next move ${move}` : `To game start`;
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            )
        });
        const status = winner ? `Winner ${winner}` : `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;

        return(
            <div className={'game'}>
                <div className={'game-board'}>
                    <Board
                        squares={current.squares}
                        check={this.scoreCheck}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className={'game-info'}>
                    <div className={'game-score'}>
                        <p className={'game-score__cap'}>Total score:</p>
                        <div className={'game-score__player game-score__player_x'}>
                            <span className={'game-score__player-score'}>{`Player X: ${this.state.score.x}`}</span>
                        </div>
                        <div className={'game-score__player game-score__player_o'}>
                            <span className={'game-score__player-score'}>{`Player O: ${this.state.score.o}`}</span>
                        </div>
                        <button className={'game-score__reset'}>Reset score</button>
                    </div>
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        )
    }
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

export default Game;
