import { plain } from "./plain.js";
import { stylish } from "./stylish.js";



const format = (data, formatName) => {
    if (formatName === 'stylish') {
        return stylish(data);
    }
    if (formatName === 'plain') {
        return plain(data);
    }
    return 'Error, incorrect format name';
}

export {format}