import React, {Component} from "react";

class StatBox extends Component {

    render(){
        return (
            <React.Fragment>
                <div>
                    <span className="m-2">{this.props.statbox.title}</span>
                    <span className="m-2">{this.props.statbox.currentValue}</span>
                    <button onClick={() => this.props.handleStatChange(this.props.statBoxKey, (a) => a + 1)}>+</button>
                    <button onClick={() => this.props.handleStatChange(this.props.statBoxKey, (a) => a - 1)}>-</button>
                    <button>max</button>
                    <button>min</button>
                </div>
            </React.Fragment>
        );
    };

}

export default StatBox;