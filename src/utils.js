const hexToBytesArray = (hex) =>{
    var arr = [];
    var sub;

    for(var i = 0; i < hex.length; i+=2){
        sub = hex.slice(i, i+2);
        arr.push(parseInt("0x"+sub, 16));
    }
    
    return new Uint8Array(arr);
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
    findIndexOf: findIndexOf
};