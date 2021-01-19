import React from "react";

class Square extends React.Component{
    render(){
        return(
            <td
                className={`square ${this.props.value ? 'active' : ''}`}
                onClick={this.props.onClick}
            >
                <span>{this.props.value}</span>
            </td>
        )
    }
}

export default Square;