// Получает обработанный объект, в котором у каждого ключа есть 2 значения (массив из 2-х значений).
// по каждому ключу возвращает строку с описанием согласно условию задачи

import _ from "lodash";

const plain = (data) => {
  let print = [];
  const iter = (currentData, keyPath = "") => {
    for (const key in currentData) {
      if (_.isObject(currentData[key]) && !currentData[key].length) {
        // если значение по ключу объект - погружаемся в этот объект
        keyPath = iter(currentData[key], (keyPath += `${key}.`));
        keyPath = keyPath.slice(0, -(key.length + 1));
      }
      let line = `Property '${keyPath}${key}'`;
      if (!_.isArray(currentData[key])) continue;
      const stringOfValue2 =
        typeof currentData[key][1] === "string"
          ? `'${currentData[key][1]}'`
          : currentData[key][1]; // определяем тип значение для печати
      const stringOfValue1 =
        typeof currentData[key][0] === "string"
          ? `'${currentData[key][0]}'`
          : currentData[key][0]; // определяем тип значение для печати
      if (
        typeof currentData[key][0] === "undefined" &&
        typeof currentData[key][1] !== "undefined"
      ) {
        line += _.isObject(currentData[key][1])
          ? ` was added with value: [complex value]`
          : ` was added with value: ${stringOfValue2}`;
        print.push(line);
      } else if (
        typeof currentData[key][0] !== "undefined" &&
        typeof currentData[key][1] === "undefined"
      ) {
        line += ` was removed`;
        print.push(line);
      } else if (
        typeof currentData[key][0] !== "undefined" &&
        typeof currentData[key][1] !== "undefined"
      ) {
        line += _.isObject(currentData[key][0])
          ? _.isObject(currentData[key][1])
            ? ` was updated. From [complex value] to [complex value]`
            : ` was updated. From [complex value] to ${stringOfValue2}`
          : _.isObject(currentData[key][1])
          ? ` was updated. From ${stringOfValue1} to [complex value]`
          : ` was updated. From ${stringOfValue1} to ${stringOfValue2}`;
        print.push(line);
      }
    }
    return keyPath;
  };
  iter(data);
  return print.join("\n");
};

export { plain };
