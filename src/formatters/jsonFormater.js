import _ from "lodash";

const stringify = (currentdata, depth) => {
  // печатет переданый необработанный объект
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      return typeof currentValue === "string"
        ? `"${currentValue}"`
        : currentValue;
    }
    const currentIndent = "  ".repeat(depth);
    const lines = Object.entries(currentValue).map(([key, value]) => {
      const char =
        _.last(_.keysIn(currentdata)) === key ||
        _.keysIn(currentdata).length === 1
          ? ""
          : ",";
      return `${currentIndent}  "  ${key}": ${iter(value, depth + 2)}${char}`;
    });
    return ["{", ...lines, `${currentIndent}}`].join("\n");
  };
  return iter(currentdata, depth);
};

const jsonFormater = (currentdata, depths = 1) => {
  const spaces = "  ".repeat(depths);
  const currentIndent = "  ".repeat(depths - 1);
  const lines = Object.entries(currentdata).flatMap(([key, value]) => {
    const isStringValue = _.isArray(value)
      ? value.map((i) => (typeof i === "string" ? `"${i}"` : i))
      : typeof value === "string"
      ? `"${value}"`
      : value;
    const char = _.last(_.keysIn(currentdata)) !== key ? "," : "";
    if (!value.length && _.isObject(value)) {
      return `${spaces}"  ${key}": ${jsonFormater(value, depths + 2)}${char}`;
    }
    if (_.isArray(value)) {
      const string1 = _.isObject(value[0])
        ? `${spaces}"- ${key}": ${stringify(value[0], depths + 1)}${char}`
        : typeof value[0] === "undefined"
        ? ""
        : `${spaces}"- ${key}": ${isStringValue[0]}${char}`;
      const string2 = _.isObject(value[1])
        ? `${spaces}"+ ${key}": ${stringify(value[1], depths + 1)}${char}`
        : typeof value[1] === "undefined"
        ? ""
        : `${spaces}"+ ${key}": ${isStringValue[1]}${char}`;
      return _.remove([string1, string2], (n) => n !== "");
    }
    return `${spaces}"  ${key}": ${isStringValue}${char}`;
  });
  return ["{", ...lines, `${currentIndent}}`].join("\n");
};

export { jsonFormater };
