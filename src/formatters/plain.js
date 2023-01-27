import _ from "lodash";

const quotes = (val) => {
  return typeof val === "string"
    ? `'${val}'`
    : _.isObject(val)
    ? `[complex value]`
    : val;
};

const plain = (data, keyPath = "") => {
  const lines = data
    .map((item) => {
      if (item.type === "Equal") return "mark";
      if (item.type === "node") {
        const anotherlines = plain(item.children, (keyPath += `${item.key}.`));
        keyPath = keyPath.slice(0, -(item.key.length + 1));
        return anotherlines;
      }
      if (item.type === "Updated") {
        return `Property '${keyPath}${item.key}' was updated. From ${quotes(
          item.value1
        )} to ${quotes(item.value2)}`;
      }
      if (item.type === "Removed") {
        return `Property '${keyPath}${item.key}' was removed`;
      }
      if (item.type === "Added") {
        return `Property '${keyPath}${item.key}' was added with value: ${quotes(
          item.value
        )}`;
      }
    })
    .filter((i) => i !== "mark");
  return [...lines].join("\n");
};

export { plain };
