import React, {Component} from "react";

class DropDown extends Component {

    state = {
        selectValue: ""
    }

    render(){

        return (
            <React.Fragment>
                <span>{this.props.title}</span>
                <select onChange={this.handleChange} value={this.state.selectValue}>
                    <option value="">-----</option>
                    {this.props.options.map(option => <option key={option} value={option}>{option}</option>)}
                </select>
            </React.Fragment>
        );
    };

    handleChange = (event) => {
        this.setState({selectValue: event.target.value});
        console.log(event.target.value);
    }

}

export default DropDown;