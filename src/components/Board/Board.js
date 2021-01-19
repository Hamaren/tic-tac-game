import React from "react";
import Square from '../Square/Square.js';

class Board extends React.Component {
    renderTable(){
        let table = [[],[],[]];

        for (let i = 0; i < this.props.squares.length; i++){
            if(i <= 2){
                table[0].push(this.renderSquare(i));
            }
            if(i > 2 && i <= 5 ){
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
                onClick={(e) => {
                    this.props.onClick(i);
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

export default Board;