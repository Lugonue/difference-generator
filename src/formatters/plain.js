import _ from 'lodash';

const quotes = (val) => {
  if (typeof val === 'string') return `'${val}'`;
  return _.isObject(val)
    ? '[complex value]'
    : val;
};

const plain = (data, keyPath = '') => {
  const lines = data
    .map((item) => {
      if (item.type === 'Equal') return 'mark';
      if (item.type === 'node') {
        const currentKey = `${keyPath}${item.key}.`;
        const anotherlines = plain(item.children, currentKey);
        return anotherlines;
      }
      if (item.type === 'Updated') {
        return `Property '${keyPath}${item.key}' was updated. From ${quotes(
          item.value1,
        )} to ${quotes(item.value2)}`;
      }
      if (item.type === 'Removed') {
        return `Property '${keyPath}${item.key}' was removed`;
      }
      return `Property '${keyPath}${item.key}' was added with value: ${quotes(
        item.value,
      )}`;
    })
    .filter((i) => i !== 'mark');
  return [...lines].join('\n');
};

export default plain;
