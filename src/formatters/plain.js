// Получает обработанный объект, в котором у каждого ключа есть 2 значения (массив из 2-х значений).
// по каждому ключу возвращает строку с описанием согласно условию задачи

import _ from "lodash";

const plain = (data, keyPath = "") => {
  const lines = Object.entries(data)
    .map(([key, value]) => {
      if (typeof value === "string") return "mark";
      if (_.isObject(value) && !value.length) {
        // если значение по ключу объект - погружаемся в этот объект
        const anotherlines = plain(value, (keyPath += `${key}.`));
        keyPath = keyPath.slice(0, -(key.length + 1));
        return anotherlines;
      }
      const checkValueType = _.isArray(value)
        ? value.map((i) =>
            typeof i === "string"
              ? `'${i}'`
              : _.isObject(i)
              ? "[complex value]"
              : i
          )
        : typeof value === "string"
        ? `"${value}"`
        : value;
      if (typeof value[0] !== "undefined" && typeof value[1] !== "undefined")
        return `Property '${keyPath}${key}' was updated. From ${checkValueType[0]} to ${checkValueType[1]}`;
      if (typeof value[0] !== "undefined")
        return `Property '${keyPath}${key}' was removed`;
      return `Property '${keyPath}${key}' was added with value: ${checkValueType[1]}`;
    })
    .filter((i) => i !== "mark");
  return [...lines].join("\n");
};

export { plain };
