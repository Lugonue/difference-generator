import _ from "lodash";

const stringify = (val, depths) => {
  if (!_.isObject(val)) return val;
  const spaces = "    ".repeat(depths);
  const spacesEnd = "    ".repeat(depths - 1);
  const lines = Object.entries(val).map(([key, value]) => {
    return `${spaces}  ${key}: ${stringify(value, depths + 1)}`;
  });
  return ["{", ...lines, `${spacesEnd}  }`].join("\n");
};

const stylish = (data, depths = 0) => {
  const spaces = "    ".repeat(depths);
  const spacesEnd =
    depths > 0 ? "    ".repeat(depths).slice(0, -2) : "    ".repeat(depths);
  const lines = data.flatMap((item) => {
    if (item.children && item.type === "node")
      return `${spaces}  ${item.key}: ${stylish(item.children, depths + 1)}`;
    if (item.type === "Updated") {
      const string1 = _.isPlainObject(item.value1)
        ? `${spaces}- ${item.key}: ${stringify(item.value1, depths + 1)}`
        : `${spaces}- ${item.key}: ${item.value1}`;
      const string2 = _.isPlainObject(item.value2)
        ? `${spaces}+ ${item.key}: ${stringify(item.value2, depths + 1)}`
        : `${spaces}+ ${item.key}: ${item.value2}`;
      return [string1, string2];
    }
    if (item.type === "Removed")
      return _.isPlainObject(item.value)
        ? `${spaces}- ${item.key}: ${stringify(item.value, depths + 1)}`
        : `${spaces}- ${item.key}: ${item.value}`;
    if (item.type === "Added")
      return _.isPlainObject(item.value)
        ? `${spaces}+ ${item.key}: ${stringify(item.value, depths + 1)}`
        : `${spaces}+ ${item.key}: ${item.value}`;
    return _.isPlainObject(item.value)
      ? `${spaces}  ${item.key}: ${stringify(item.value, depths + 1)}`
      : `${spaces}  ${item.key}: ${item.value}`;
  });
  return ["{", ...lines, `${spacesEnd}}`].join("\n");
};

export { stylish };
