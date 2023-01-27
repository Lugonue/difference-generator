import _ from "lodash";

const jsonFormater = (currentdata, depths = 1) => {
  const spaces = "  ".repeat(depths);
  const currentIndent = depths === 1 
  ? ''
  : '  '.repeat(depths - 2);
  const lines = Object.entries(currentdata).map(([key, value]) => {
    if (typeof(value) === 'string') return 'mark';
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
    const char = _.last(_.keysIn(currentdata)) !== key ? "," : "";
    if (!value.length && _.isObject(value)) {
      //if value is object
      return `${spaces}"${key}": ${jsonFormater(value, depths + 2)}${char}`;
    }
    if (typeof value[0] !== "undefined" && typeof value[1] !== "undefined") {
      return `${spaces}"${key}": "was updated from ${checkValueType[0]} to ${checkValueType[1]}"${char}`;
    } else if (typeof value[0] !== "undefined") {
      return `${spaces}"${key}": "was removed"${char}`;
    } else {
      return `${spaces}"${key}": "was added with value: ${checkValueType[1]}"${char}`;
    }
  }).filter(i => i !== 'mark');
  return ["{", ...lines, `${currentIndent}}`].join("\n");
};

export { jsonFormater };
