import _ from 'lodash';

const stringify = (val, depths) => {
  if (!_.isObject(val)) return val;
  const spaces = '  '.repeat(depths);
  const spacesEnd = '  '.repeat(depths - 1);
  const lines = Object.entries(val).map(([key, value]) => `${spaces}  ${key}: ${stringify(value, depths + 2)}`);
  return ['{', ...lines, `${spacesEnd}}`].join('\n');
};

const stringBuilder = (status, spaces, key, value, depths) => {
  if (_.isPlainObject(value)) {
    return `${spaces}${status} ${key}: ${stringify(value, depths + 2)}`;
  }
  return `${spaces}${status} ${key}: ${value}`;
};

const stylish = (data, depths = 1) => {
  const spaces = '  '.repeat(depths);
  const spacesEnd = depths > 0 ? '  '.repeat(depths).slice(0, -2) : '    '.repeat(depths);
  const lines = data.flatMap((item) => {
    if (item.children && item.type === 'node') return `${spaces}  ${item.key}: ${stylish(item.children, depths + 2)}`;
    if (item.type === 'Updated') {
      const string1 = stringBuilder('-', spaces, item.key, item.value1, depths);
      const string2 = stringBuilder('+', spaces, item.key, item.value2, depths);
      return [string1, string2];
    }
    if (item.type === 'Removed') {
      return stringBuilder('-', spaces, item.key, item.value, depths);
    }
    if (item.type === 'Added') {
      return stringBuilder('+', spaces, item.key, item.value, depths);
    }
    return stringBuilder(' ', spaces, item.key, item.value, depths);
  });
  return ['{', ...lines, `${spacesEnd}}`].join('\n');
};
export default stylish;
