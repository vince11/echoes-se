import React, {Component} from "react";
import DropDown from "./dropDown";
import units from "../resources/unitDB";

class Editor extends Component {

    state = {
        unitNames: units.map(unit => { return {key: unit.id, value: unit.name}}),
        saveFile: [],
        hasInput: false
    }
    
    render(){
        return (
            <div>
                <div>
                    <DropDown title="Unit: " options={[]}/>
                    <DropDown title="Held Item: " options={[]}/>
                    <DropDown title="Forge: " options={[]}/>
                    <DropDown title="Class: " options={[]}/>
                </div>
                <div>
                    <input type="file" disabled={!this.state.hasInput ? "" : "disabled"} onChange={this.handleFileInput}/>
                </div>
            </div>

        );
    };

    handleFileInput = (event) => {
        if(event.target.files[0] != null){
            var fileReader = new FileReader();
            fileReader.onload = () => {
                const buffer = fileReader.result;
                this.setState({saveFile: new Uint8Array(buffer), hasInput: true});
            };
            fileReader.readAsArrayBuffer(event.target.files[0]);
        }
    }

}

export default Editor;