const hexToBytesArray = (hex) =>{
    var arr = [];
    var sub;

    for(var i = 0; i < hex.length; i+=2){
        sub = hex.slice(i, i+2);
        arr.push(parseInt("0x"+sub, 16));
    }
    
    return new Uint8Array(arr);
};

const byteArrayToHex = (byteArr) => {
    var hex = "";
    var byteStr;
    byteArr.forEach(byte => {
        byteStr = byte.toString(16).toUpperCase();
        hex += byteStr.length === 2 ? byteStr : "0" + byteStr;
    });

    return hex;
};

const getByteArray = (source, start, size) => {
    var bytes = [];
    for(var i = start; i < start + size; i++){
        bytes.push(source[i]);
    }

    return bytes;
};

const findIndexOf = (match, source, start, maxLength) =>{

    var found;
    for(var i = start; i < maxLength; i++){
        found = true;
        if(maxLength - i >= match.length){
            for(var j = 0; j < match.length; j++){
                if(source[i+j] !== match[j]){
                    found = false;
                    break;
                }
            }
    
            if(found){
                return i;
            }
        }
    }

    return -1;
};

export default {
    hexToBytesArray: hexToBytesArray,
    findIndexOf: findIndexOf,
    getByteArray: getByteArray,
    byteArrayToHex: byteArrayToHex
};