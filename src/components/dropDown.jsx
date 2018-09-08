import React, {Component} from "react";

class DropDown extends Component {

    render(){
        return (
            <React.Fragment>
                <span>{this.props.dropdown.title}</span>
                <select onChange={(e) => this.props.onChange(this.props.dropDownKey, e)} value={this.props.dropdown.selected}>
                    <option value="">-----</option>
                    {this.props.dropdown.options.map(option => <option key={option} value={option}>{option}</option>)}
                </select>
            </React.Fragment>
        );
    };

}

export default DropDown;