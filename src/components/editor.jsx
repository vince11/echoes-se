import React, {Component} from "react";
import DropDown from "./dropDown";
import StatBox from "./statBox";
import units from "../resources/unitDB";
import items from "../resources/itemDB";
import unitClasses from "../resources/unitClassesDB";
import editorUtils from "../utils";

class Editor extends Component {

    state = {
        saveFile: [],
        hasInput: false,
        unitsCache: null,
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
        ],
        statBoxes: {
            lvl: {
                title: "Level",
                currentValue: 1,
                maxValue: 20,
                minValue: 1,
            },
            exp: {
                title: "Experience",
                currentValue: 0,
                maxValue: 99,
                minValue: 0,
            },
            hp: {
                title: "HP",
                currentValue: 0,
                maxValue: 0,
                minValue: 0,
            },
            atk: {
                title: "Attack",
                currentValue: 0,
                maxValue: 0,
                minValue: 0,
            },
            skl: {
                title: "Skill",
                currentValue: 0,
                maxValue: 0,
                minValue: 0,
            },
            spd: {
                title: "Speed",
                currentValue: 0,
                maxValue: 0,
                minValue: 0,
            },
            lck: {
                title: "Luck",
                currentValue: 0,
                maxValue: 0,
                minValue: 0,
            },
            def: {
                title: "Defense",
                currentValue: 0,
                maxValue: 0,
                minValue: 0,
            },
            res: {
                title: "Resistance",
                currentValue: 0,
                maxValue: 0,
                minValue: 0,
            }
        }
    }
    
    render(){
        return (
            <div>
                <div>
                    {this.state.dropDowns.map(dropdown => (
                        <DropDown 
                            key={dropdown.title} 
                            dropdown={dropdown}
                            onChange={this.handleDropDownChange}
                        />
                    ))}
                </div>
                <div>
                    {Object.keys(this.state.statBoxes).map(key => (
                        <StatBox 
                            key={key}
                            statBoxKey={key} 
                            statbox={this.state.statBoxes[key]}
                            handleStatChange={this.handleStatChange}
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
            [0,1,2,3,4,5],
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

        if(index === 0){
            this.populateDropDowns(ddCopy, event.target.value);
        }
        else if(index === 1){
            this.updateItem(ddCopy, event.target.value);
        }
        else if(index === 2){
            this.updateForge(ddCopy, event.target.value);
        }
        else if(index === 3){
            this.updateClass(ddCopy, event.target.value);
        }
    }
    
    populateDropDowns(dropdowns, unitName){

        var statboxes = {...this.state.statBoxes};
        if(unitName !== ""){

            dropdowns[0] = {...dropdowns[0]};
            dropdowns[1] = {...dropdowns[1]};
            dropdowns[2] = {...dropdowns[2]};
            dropdowns[3] = {...dropdowns[3]};

            var itemAddress = this.state.unitsCache.get(unitName).itemAddr;
            var itemBytes = editorUtils.getByteArray(this.state.saveFile, itemAddress, 8);
            var itemHex = editorUtils.byteArrayToHex(itemBytes);
            var item = items.find((e) => e.hex === itemHex);

            var classAddress = this.state.unitsCache.get(unitName).classAddr;
            var classBytes = editorUtils.getByteArray(this.state.saveFile, classAddress, 8);
            var classHex = editorUtils.byteArrayToHex(classBytes);
            var unitClass = unitClasses.find((e) => e.id === classHex);
    
            var forgeCount = "";
            if(item.maxStars > 0){
                dropdowns[2].options = [...Array(item.maxStars + 1).keys()];
                forgeCount = this.state.saveFile[itemAddress - 1] >> 4;
            }
            else {
                dropdowns[2].options = [];
            }

            dropdowns[0].selected = unitName;
            dropdowns[1].selected = item.name;
            dropdowns[2].selected = forgeCount;
            dropdowns[3].selected = unitClass.name;

            var unitAddr = this.state.unitsCache.get(unitName).unitAddr;
            var unit = units.find(e => e.name === unitName);
            Object.keys(statboxes).forEach((key, index) => {
                statboxes[key] = {...statboxes[key]};
                if(key === "lvl"){
                    statboxes[key].currentValue = this.state.saveFile[unitAddr - 2];
                }
                else if(key === "exp"){
                    statboxes[key].currentValue = this.state.saveFile[unitAddr - 1];
                }
                else{
                    statboxes[key].minValue = unit.baseStats[key];
                    statboxes[key].maxValue = unit.maxStats[key];
                    statboxes[key].currentValue = this.state.saveFile[unitAddr + 19 + index] + unit.baseStats[key];
                }
            });
            
            
        }
        else {
            dropdowns.forEach((e, i) => {
                dropdowns[i] = {...dropdowns[i]};
                dropdowns[i].selected = "";
            });
        }

        this.setState({dropDowns: dropdowns, statBoxes: statboxes});

    }

    updateItem = (dropdowns, newItem) => {
        if(newItem !== ""){
            var item = items.find((e) => e.name === newItem);
            var newItemHex = item.id + (item.isDLC ? "010008" : "000000") + item.hex;
            var newItemBytes = editorUtils.hexToBytesArray(newItemHex);
            var newItemStart = this.state.unitsCache.get(dropdowns[0].selected).itemAddr - 4;
    
            var updatedSaveFile = [...this.state.saveFile];
            newItemBytes.forEach((e, i) => {
                updatedSaveFile[newItemStart + i] = e;
            });
    
            var forgeCount = "";
            if(item.maxStars > 0){
                dropdowns[2].options = [...Array(item.maxStars + 1).keys()];
                forgeCount = 0
            }
            else{
                dropdowns[2].options = [];
            }
    
            dropdowns[1] = {...dropdowns[1]};
            dropdowns[1].selected = newItem;
            dropdowns[2] = {...dropdowns[2]};
            dropdowns[2].selected = forgeCount;
    
            this.setState({dropDowns: dropdowns, saveFile: updatedSaveFile});
        }
    }

    updateForge = (dropdowns, newForge) => {
        if(newForge !== ""){
            var forgeAddress = this.state.unitsCache.get(dropdowns[0].selected).itemAddr - 1;
            var updatedSaveFile = [...this.state.saveFile];
            updatedSaveFile[forgeAddress] = (updatedSaveFile[forgeAddress] & 0x0F) | (newForge << 4);
    
            dropdowns[2] = {...dropdowns[2]};
            dropdowns[2].selected = newForge;
    
            this.setState({dropDowns: dropdowns, saveFile: updatedSaveFile});
        }
    }

    updateClass = (dropdowns, newClass) => {
        if(newClass !== ""){
            var classAddr = this.state.unitsCache.get(dropdowns[0].selected).classAddr;
            var unitClass = unitClasses.find(e => e.name === newClass);
            var newClassBytes = editorUtils.hexToBytesArray(unitClass.id);

            var updatedSaveFile = [...this.state.saveFile];
            newClassBytes.forEach((e, i) => {
                updatedSaveFile[classAddr + i] = e;
            });

            dropdowns[3] = {...dropdowns[3]};
            dropdowns[3].selected = newClass;
    
            this.setState({dropDowns: dropdowns, saveFile: updatedSaveFile});
        }
    }

    handleStatChange = (key, operation) => {
        var updatedSaveFile = [...this.state.saveFile];
        var statBoxes = {...this.state.statBoxes};
        statBoxes[key] = {...statBoxes[key]};
        statBoxes[key].currentValue = Math.max(statBoxes[key].minValue, Math.min(operation(statBoxes[key].currentValue), statBoxes[key].maxValue));
        

        var unitAddr = this.state.unitsCache.get(this.state.dropDowns[0].selected).unitAddr;
        var unit = units.find(e => e.name === this.state.dropDowns[0].selected);

        if(key === "lvl"){
            updatedSaveFile[unitAddr - 2] = statBoxes[key].currentValue;
        }
        else if(key === "exp"){
            updatedSaveFile[unitAddr - 1] = statBoxes[key].currentValue;
        }
        else{
            updatedSaveFile[unitAddr + 19 + Object.keys(statBoxes).indexOf(key)] = statBoxes[key].currentValue - unit.baseStats[key];
        }

        this.setState({statBoxes: statBoxes, saveFile: updatedSaveFile});
    }
}

export default Editor;