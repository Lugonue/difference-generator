import { compareFiles } from "./compareFiles.js"
import { format } from "./formatters/index.js";



const genDIffMain = (filepath1, filepath2, formatName) => {
    const differenceData = compareFiles(filepath1, filepath2);
    const formatData = format(differenceData, formatName);
    return formatData;
}


export {genDIffMain};