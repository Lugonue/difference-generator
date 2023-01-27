// Получает обработанный объект, в котором у каждого ключа есть 2 значения (массив из 2-х значений). Печатает значение каждого с префиксом "+" или
// или "-", исли значание имеется.
// если значение у ключа одно, то значит сравниваемые объекты были идентичны по этому ключу

import _ from "lodash";

const stringify = (value, depth) => {
  // печатет переданый необработанный объект
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }
    const currentIndent = "  ".repeat(depth);
    const lines = Object.entries(currentValue).map(
      ([key, val]) => `${currentIndent}    ${key}: ${iter(val, depth + 2)}`
    );
    return ["{", ...lines, `${currentIndent}}`].join("\n");
  };
  return iter(value, depth);
};

const stylish = (data, depths = 1) => {
  const spaces = "  ".repeat(depths);
  const currentIndent = "  ".repeat(depths - 1);
  const lines = Object.entries(data).flatMap(([key, value]) => {
    if (!value.length && _.isObject(value)) {
      // если значение по ключу объект - погружаемся в этот объект
      return `${spaces}  ${key}: ${stylish(value, depths + 2)}`;
    }
    if (_.isArray(value)) {
      // если массив то возвращаем значения по индексам массива
      // строим строку по первому значению (первого объекта сравнения)
      const string1 = _.isObject(value[0])
        ? `${spaces}- ${key}: ${stringify(value[0], depths + 1)}`
        : typeof value[0] === "undefined"
        ? ""
        : `${spaces}- ${key}: ${value[0]}`;
      // строим строку по второму значению (второго объекта сравнения)
      const string2 = _.isObject(value[1])
        ? `${spaces}+ ${key}: ${stringify(value[1], depths + 1)}`
        : typeof value[1] === "undefined"
        ? ""
        : `${spaces}+ ${key}: ${value[1]}`;
      return _.remove([string1, string2], (n) => n !== "");
    }
    // если строка то добавляем строку
    return `${spaces}  ${key}: ${value}`;
  });
  return ["{", ...lines, `${currentIndent}}`].join("\n");
};

export { stylish };
