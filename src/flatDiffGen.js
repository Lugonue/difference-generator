import fs from 'fs';
import _ from 'lodash';
import path from 'path';

const getExtantion = (fileName) => fileName.split('.')[1];
const getObject = (fileName) => { // принимает имя файла => возвращает объект содержимого в файле
    const extension = getExtantion(fileName);
    const getPath = path.resolve(fileName);
    return extension === 'json' ? JSON.parse(fs.readFileSync(getPath, 'utf8')) : 'YML';
}


const compareData = (fileName1, fileName2) => {
    const data1 = getObject(fileName1);
    const data2 = getObject(fileName2);
    const data1Array = _.keysIn(data1).sort();
    const data2Array = _.keysIn(data2).sort();

    const y = _.uniq([...data1Array, ...data2Array].sort());

    return y.reduce((outString, key) => {
        if (data1[key] === data2[key]) outString += `    ${key}: ${data2[key]}\n`;
        else if ( typeof(data1[key]) != "undefined" && typeof(data2[key]) != "undefined") outString += `  - ${key}: ${data1[key]}\n  + ${key}: ${data2[key]}\n`;
        else if (typeof(data1[key]) != "undefined") outString += `  - ${key}: ${data1[key]}\n`;
        else if (typeof(data2[key]) != "undefined") outString += `  + ${key}: ${data2[key]}\n`;
        return outString;
        },'{\n') + `}`;
}
export {
    getObject,
    getExtantion,
    compareData

}