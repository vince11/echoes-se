import React, {Component} from "react";
import DropDown from "./dropDown";
import StatBox from "./statBox";
import units from "../resources/unitDB";
import items from "../resources/itemDB";
import unitClasses from "../resources/unitClassesDB";
import editorUtils from "../utils";

class Editor extends Component {

    state = {
        saveFileName: "chapter",
        saveFile: [],
        hasInput: false,
        buttonsDisabled: true,
        unitsCache: null,
        dropDowns: {
            unit: {
                title: "Unit",
                selected: "",
                options: [],
                eventHandler: (e) => this.populateDropDowns(e.target.value)
            },
            item: {
                title: "Held Item",
                selected: "",
                options: [],
                eventHandler: (e) => this.updateItem(e.target.value)
            },
            forge: {
                title: "Forge",
                selected: "",
                options: [],
                eventHandler: (e) => this.updateForge(e.target.value)
            },
            unitClass: {
                title: "Class",
                selected: "",
                options: [],
                eventHandler: (e) => this.updateClass(e.target.value)
            }
        },
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
                    {Object.keys(this.state.dropDowns).map(key => (
                        <DropDown 
                            key={key}
                            dropdown={this.state.dropDowns[key]}
                            onChange={this.state.dropDowns[key].eventHandler}
                            disabled={(key==="unit") ? false : this.state.buttonsDisabled}
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
                            disabled={this.state.buttonsDisabled}
                        />
                    ))}
                </div>
                <div>
                    <input type="file" disabled={this.state.hasInput} onChange={this.handleFileInput}/>
                </div>
                <div>
                    <button type="submit" hidden={!this.state.hasInput} onClick={this.downloadFile}>Download</button>
                </div>
            </div>

        );
    };

    handleFileInput = (event) => {
        if(event.target.files[0] != null){
            var fileReader = new FileReader();
            var fileName = event.target.files[0].name;
            fileReader.onload = () => {
                const buffer = fileReader.result;
                this.setState({saveFileName: fileName, saveFile: new Uint8Array(buffer), hasInput: true});
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

        var dropDowns = {};

        Object.keys(this.state.dropDowns).forEach((key, i) =>{
            dropDowns[key] = {...this.state.dropDowns[key]};
            dropDowns[key].options = db[i];
        });

        this.setState({dropDowns});
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

    populateDropDowns = (unitName) => {

        var dropDowns = {...this.state.dropDowns};
        var statboxes = {...this.state.statBoxes};

        if(unitName !== ""){

            Object.keys(dropDowns).forEach((key) =>{
                dropDowns[key] = {...dropDowns[key]};
            });

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
                dropDowns["forge"].options = [...Array(item.maxStars + 1).keys()];
                forgeCount = this.state.saveFile[itemAddress - 1] >> 4;
            }
            else {
                dropDowns["forge"].options = [];
            }

            dropDowns["unit"].selected = unitName;
            dropDowns["item"].selected = item.name;
            dropDowns["forge"].selected = forgeCount;
            dropDowns["unitClass"].selected = unitClass.name;

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
            
            this.setState({dropDowns: dropDowns, statBoxes: statboxes, buttonsDisabled: false});
        }
        else{
            dropDowns["unit"] = {...dropDowns["unit"]};
            dropDowns["unit"].selected = "";
            this.setState({dropDowns: dropDowns, buttonsDisabled: true});
        }
        
    }

    updateItem = (newItem) => {

        if(newItem !== ""){
            var dropDowns = {...this.state.dropDowns};

            var item = items.find((e) => e.name === newItem);
            var newItemHex = item.id + (item.isDLC ? "010008" : "000000") + item.hex;
            var newItemBytes = editorUtils.hexToBytesArray(newItemHex);
            var newItemStart = this.state.unitsCache.get(dropDowns["unit"].selected).itemAddr - 4;
    
            var updatedSaveFile = [...this.state.saveFile];
            newItemBytes.forEach((e, i) => {
                updatedSaveFile[newItemStart + i] = e;
            });
    
            var forgeCount = "";
            dropDowns["forge"] = {...dropDowns["forge"]};

            if(item.maxStars > 0){
                dropDowns["forge"].options = [...Array(item.maxStars + 1).keys()];
                forgeCount = 0
            }
            else{
                dropDowns["forge"].options = [];
            }

            dropDowns["forge"].selected = forgeCount;
    
            dropDowns["item"] = {...dropDowns["item"]};
            dropDowns["item"].selected = newItem;
            
            this.setState({dropDowns: dropDowns, saveFile: updatedSaveFile});
        }
    }

    updateForge = (newForge) => {

        if(newForge !== ""){
            var dropDowns = {...this.state.dropDowns};
            var forgeAddress = this.state.unitsCache.get(dropDowns["unit"].selected).itemAddr - 1;
            var updatedSaveFile = [...this.state.saveFile];
            updatedSaveFile[forgeAddress] = (updatedSaveFile[forgeAddress] & 0x0F) | (newForge << 4);
    
            dropDowns["forge"] = {...dropDowns["forge"]};
            dropDowns["forge"].selected = newForge;
    
            this.setState({dropDowns: dropDowns, saveFile: updatedSaveFile});
        }
    }

    updateClass = (newClass) => {
        if(newClass !== ""){
            var dropDowns = {...this.state.dropDowns};
            var classAddr = this.state.unitsCache.get(dropDowns["unit"].selected).classAddr;
            var unitClass = unitClasses.find(e => e.name === newClass);
            var newClassBytes = editorUtils.hexToBytesArray(unitClass.id);

            var updatedSaveFile = [...this.state.saveFile];
            newClassBytes.forEach((e, i) => {
                updatedSaveFile[classAddr + i] = e;
            });

            dropDowns["unitClass"] = {...dropDowns["unitClass"]};
            dropDowns["unitClass"].selected = newClass;
    
            this.setState({dropDowns: dropDowns, saveFile: updatedSaveFile});
        }
    }

    handleStatChange = (key, addOn) => {
        var updatedSaveFile = [...this.state.saveFile];
        var statBoxes = {...this.state.statBoxes};
        statBoxes[key] = {...statBoxes[key]};

        if(addOn.op !== null){
            statBoxes[key].currentValue = Math.max(statBoxes[key].minValue, Math.min(addOn.op(statBoxes[key].currentValue), statBoxes[key].maxValue));
        }
        else{
            statBoxes[key].currentValue = addOn.val;
        }

        var unitAddr = this.state.unitsCache.get(this.state.dropDowns["unit"].selected).unitAddr;
        var unit = units.find(e => e.name === this.state.dropDowns["unit"].selected);

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

    downloadFile = () => {
        var blob = new Blob([new Uint8Array(this.state.saveFile)], {type: "application/octet-stream"});
        //var file = btoa(String.fromCharCode.apply(null,new Uint8Array(this.state.saveFile)));
        //var url = "data:application/octet-stream;base64," + encodeURIComponent(file);
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = this.state.saveFileName;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}

export default Editor;