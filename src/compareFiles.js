import _ from 'lodash';
import { parser } from './parsers.js';

const compareFiles = (data1, data2) => {
    const currentdata1 = parser(data1);
    const currentdata2 = parser(data2);
    const iter = (currentdata1, currentdata2) => {
        const currentdataArray1 = Object.entries(currentdata1);
        const currentdataArray2 = Object.entries(currentdata2);
        return [...currentdataArray1, ...currentdataArray2].sort().reduce((acc, [key, value]) => {
            if (_.isObject(value)) {
                if (_.hasIn(currentdata1, key) && _.hasIn(currentdata2, key)) {
                    acc[key] = iter(currentdata1[key], currentdata2[key]);
                    return acc;
                }
            }
            if (currentdata1[key] === currentdata2[key]) {
                acc[key] = value;
            } else {
                if (_.hasIn(currentdata1, key) && _.hasIn(currentdata2, key)) {
                    acc[key] = [currentdata1[key], currentdata2[key]];
                } else if (_.hasIn(currentdata1, key)) {
                    acc[key] = [currentdata1[key], undefined];
                } else {
                    acc[key] = [undefined, currentdata2[key]];
                }
            }
            return acc;
        }, {});    
    }

    return iter(currentdata1, currentdata2);
}


export { compareFiles };