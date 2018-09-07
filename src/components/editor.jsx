import React, {Component} from "react";
import DropDown from "./dropDown";
import units from "../resources/unitDB";
import items from "../resources/itemDB";
import unitClasses from "../resources/unitClassesDB";
import editorUtils from "../utils";

class Editor extends Component {

    state = {
        saveFile: [],
        hasInput: false,
        dropDowns: [
            {
                title: "Unit",
                options: []
            },
            {
                title: "Held Item",
                options: []
            },
            {
                title: "Forge",
                options: []
            },
            {
                title: "Class",
                options: []
            }
        ]
    }
    
    render(){
        return (
            <div>
                <div>
                    {this.state.dropDowns.map(dropdown => <DropDown key={dropdown.title} title={dropdown.title} options={dropdown.options}/> )}
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
                this.loadData();
            };
            fileReader.readAsArrayBuffer(event.target.files[0]);
        }
    }

    loadData = () => {
        var u = units
            .filter(unit => editorUtils.findIndexOf(editorUtils.hexToBytesArray(unit.id), this.state.saveFile, 0, this.state.saveFile.length) !== -1)
            .map(unit => unit.name).sort();

        const db = [
            u,
            items.map(item => item.name).sort(),
            [1,2,3,4,5],
            unitClasses.map(uc => uc.name).sort()
        ];
        var dropDowns = [];
        this.state.dropDowns.forEach((e, i) => {
            dropDowns.push({title: e.title, options:db[i]})
        });

        this.setState({dropDowns});
    }

}

export default Editor;