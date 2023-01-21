// Получает обработанный объект, в котором у каждого ключа есть 2 значения (массив из 2-х значений). Печатает значение каждого с префиксом "+" или 
// или "-", исли значание имеется.
// если значение у ключа одно, то значит сравниваемые объекты были идентичны по этому ключу

import _ from 'lodash';

const stringify = (value, depth) => { // печатет переданый необработанный объект
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }
    const currentIndent = '  '.repeat(depth);
    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => `${currentIndent}    ${key}: ${iter(val, depth + 2)}`);
    return [
      '{',
      ...lines,
      `${currentIndent}}`,
    ].join('\n');
  };
  return iter(value, depth);
};

const stylish = (data, depths = 1) => {
  let string = '{';
  for (const key in data) {
    if (!data[key].length && _.isObject(data[key])) { 
// если значение по ключу объект - погружаемся в этот объект
      string += `\n${'  '.repeat(depths)}  ${key}: ${stylish(data[key], depths + 2)}`;
    } else if (_.isArray(data[key])) { 
// если массив то возвращаем значения по индексам массива
      // строим строку по первому значению (первого объекта сравнения)
      string += _.isObject(data[key][0]) ? `\n${'  '.repeat(depths)}- ${key}: ${stringify(data[key][0], depths + 1)}` : (typeof(data[key][0]) === 'undefined' ? '' : `\n${'  '.repeat(depths)}- ${key}: ${data[key][0]}`);
      // строим строку по второму значению (второго объекта сравнения)
      string += _.isObject(data[key][1]) ? `\n${'  '.repeat(depths)}+ ${key}: ${stringify(data[key][1], depths + 1)}` : (typeof(data[key][1]) === 'undefined' ? '' : `\n${'  '.repeat(depths)}+ ${key}: ${data[key][1]}`);
    } else { 
// если строка то добавляем строку
      string = `${string}\n${'  '.repeat(depths)}  ${key}: ${data[key]}`;
    }
  }
  string = `${string}\n${'  '.repeat(depths - 1)}}`;
  return string;
}

export { stylish };

