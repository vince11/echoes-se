import React, {Component} from "react";

class StatBox extends Component {

    render(){
        return (
            <React.Fragment>
                <div>
                    <span className="m-2">{this.props.statbox.title}</span>
                    <span className="m-2">{this.props.statbox.currentValue}</span>
                    <button disabled={this.props.disabled} onClick={() => this.props.handleStatChange(this.props.statBoxKey, { op: (a) => a + 1, val: null})}>+</button>
                    <button disabled={this.props.disabled} onClick={() => this.props.handleStatChange(this.props.statBoxKey, { op: (a) => a - 1, val: null})}>-</button>
                    <button disabled={this.props.disabled} onClick={() => this.props.handleStatChange(this.props.statBoxKey, { op: null, val: this.props.statbox.maxValue})}>max</button>
                    <button disabled={this.props.disabled} onClick={() => this.props.handleStatChange(this.props.statBoxKey, { op: null, val: this.props.statbox.minValue})}>min</button>
                </div>
            </React.Fragment>
        );
    };

}

export default StatBox;