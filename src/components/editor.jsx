import React, {Component} from "react";
import DropDown from "./dropDown";
import units from "../resources/unitDB";

class Editor extends Component {

    state = {
        unitNames: units.map(unit => { return {key: unit.id, value: unit.name}})
    }
    
    render(){
        return (
            <div>
                <DropDown title="Unit: " options={this.state.unitNames}/>
                <DropDown title="Held Item: " options={[]}/>
                <DropDown title="Forge: " options={[]}/>
                <DropDown title="Class: " options={[]}/>
            </div>
        );
    };

}

export default Editor;