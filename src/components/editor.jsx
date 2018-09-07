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
        unitsCache: null,
        bindEvents: false,
        dropDowns: [
            {
                title: "Unit",
                selected: "",
                options: []
            },
            {
                title: "Held Item",
                selected: "",
                options: []
            },
            {
                title: "Forge",
                selected: "",
                options: []
            },
            {
                title: "Class",
                selected: "",
                options: []
            }
        ]
    }
    
    render(){
        return (
            <div>
                <div>
                    {this.state.dropDowns.map(dropdown => (
                        <DropDown 
                            key={dropdown.title} 
                            dropdown={dropdown}
                            onChange={this.state.bindEvents ? this.handleDropDownChange : null}
                        />
                    ))}
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
        
        const db = [
            this.loadUnits(),
            items.map(item => item.name).sort(),
            [1,2,3,4,5],
            unitClasses.map(uc => uc.name).sort()
        ];
        var dropDowns = [];
        this.state.dropDowns.forEach((e, i) => {
            dropDowns.push({title: e.title, options:db[i], selected:""})
        });

        this.setState({dropDowns:dropDowns, bindEvents: true});
    }

    loadUnits = () => {
        var unitsCache = new Map();
        var unitAddr, itemAddr;
        units.forEach(unit => {
            unitAddr = editorUtils.findIndexOf(editorUtils.hexToBytesArray(unit.id), this.state.saveFile, 0, this.state.saveFile.length);
            if(unitAddr !== -1){
                itemAddr = editorUtils.findIndexOf([0x02, 0x01], this.state.saveFile, unitAddr + 30, unitAddr + 200);
                unitsCache.set(unit.name, {unitAddr: unitAddr, itemAddr: itemAddr + 6, classAddr: unitAddr + 8});
            }
        });

        this.setState({unitsCache});
        return [...unitsCache.keys()].sort();
    }

    handleDropDownChange = (dropdown, event) => {
        var ddCopy = [...this.state.dropDowns];
        var index = ddCopy.indexOf(dropdown);
        ddCopy[index] = {...dropdown};
        ddCopy[index].selected = event.target.value;
        if(index === 0 && event.target.value !== ""){
            var copyDD = {...ddCopy[1]};
            ddCopy[1] = copyDD;
            var itemAddress = this.state.unitsCache.get(event.target.value).itemAddr;
            var bytes = editorUtils.getByteArray(this.state.saveFile, itemAddress, 8);
            var itemHex = editorUtils.byteArrayToHex(bytes);
            var item = items.find((e) => e.hex === itemHex);
            ddCopy[1].selected = item.name;
        }

        this.setState({dropDowns: ddCopy});
    }

}

export default Editor;