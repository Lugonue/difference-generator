import compareObject from './compareObject.js';
import format from './formatters/index.js';
import parser from './parsers.js';

const genDIffMain = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = parser(filepath1);
  const data2 = parser(filepath2);
  const differenceData = compareObject(data1, data2);
  const formatData = format(differenceData, formatName);
  return formatData;
};
export default genDIffMain;
