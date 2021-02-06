import React from 'react';
import Board from './Board/Board.js';
import '../scss/Game.scss';

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
            showSteps: false,
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            //if we have a winner or all squares is busy, just return from handleClick
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        }, () => {
            //if someone wins, increase the counter of winner

            switch (calculateWinner(squares)) {
                case 'X' :
                    this.setState({
                        score: {
                            x: this.state.score.x + 1,
                            o: this.state.score.o,
                        }
                    });
                    break;
                case 'O':
                    this.setState({
                        score: {
                            x: this.state.score.x,
                            o: this.state.score.o + 1,
                        }
                    });
                    break;
                default: return;
            }
        });
    }

    clearScore() {
        //clear score of wins
        this.setState({
            score: {
                x: 0,
                o: 0,
            }
        })
    }

    playAgain() {
        //refresh the history and steps for new game
        this.setState({
            history: [{
                squares: Array(9).fill(null)
            }],
            stepNumber: 0,
        })
    }

    jumpTo(step) {
        //navigation inside steps history
        if (step) {
            this.setState({
                stepNumber: step,
                xisNext: (step % 2) === 0
            })
        } else {
            this.setState({
                history: [{
                    squares: Array(9).fill(null)
                }],
                stepNumber: 0,
            })
        }
    }

    showSteps() {
        //show or hide history of steps
        this.setState({
            showSteps: !this.state.showSteps
        })
    }

    render() {
        const history = this.state.history;
        const stepNumber = this.state.stepNumber;
        const current = history[stepNumber];
        const winner = calculateWinner(current.squares);
        const moves = history.map((step, move) => {
            if (move) {
                //render history steps
                const desc = `To next move ${move}`;
                return (
                    <li key={move}>
                        <button onClick={() => this.jumpTo(move)}
                                className={'game-info__jump-to game-btn'}>{desc}</button>
                    </li>
                )
            } else {
                return null
            }
        });
        const status = (winner) ?
            (winner === 'Draw') ? `Draw` : `Winner ${winner}` :
            `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;

        return (
            <div className={'game'}>
                <div className={'game-info game-info_left'}>
                    <p className={'game-info__cap'}>Actions:</p>
                    <div className={'game-info__player'}>
                        <span className={'game-score__player-score'}>{status}</span>
                    </div>
                    <div className={'game-info__player'}>
                            <span className={'game-score__player-score'}>
                                Steps remain: {current.squares.length - stepNumber}
                            </span>
                    </div>
                    {this.state.showSteps ? (
                        <div className={'history-wrapper'}>
                            <p className={'game-info__cap'}>Steps history:</p>
                            <ul className={'game-info__list'}>{moves}</ul>
                        </div>
                    ) : null}
                </div>
                <div className={'game-board'}>
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className={'game-info game-info_right'}>
                    <p className={'game-info__cap'}>Total score:</p>
                    <div className={'game-info__player game-info__player_x'}>
                        <span className={'game-info__player-score'}>{`Player X: ${this.state.score.x}`}</span>
                    </div>
                    <div className={'game-info__player game-info__player_o'}>
                        <span className={'game-info__player-score'}>{`Player O: ${this.state.score.o}`}</span>
                    </div>
                    <div className={'game-info__show-steps'}>
                        <input
                            type='checkbox' id="show-steps" className={'ios-switch'}
                            onChange={() => this.showSteps()}
                        />
                        <label htmlFor="show-steps">Show history</label>
                    </div>
                    <button
                        className={'game-info__reset game-btn'}
                        onClick={() => this.clearScore()}
                    >
                        Reset score
                    </button>
                    {winner ? (
                        <button
                            className={'game-info__again game-btn'}
                            onClick={() => this.playAgain()}
                        >
                            Play again
                        </button>) : null}
                </div>
            </div>
        )
    }
}

function calculateWinner(squares) {
    //calculate who win or draw status
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
        } else {
            if (!squares.includes(null)) {
                return 'Draw'
            }
        }
    }

    return null;
}

export default Game;