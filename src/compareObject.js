import _ from "lodash";

const compareObject = (obj1, obj2) => {
  const keysObj1 = _.keysIn(obj1);
  const keysObj2 = _.keysIn(obj2);
  const keys = _.uniq([...keysObj1, ...keysObj2]).sort();
  return keys
    .map((key) => {
      const value1 = obj1[key];
      const value2 = obj2[key];
      if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
        return {
          type: "node",
          key: key,
          children: compareObject(value1, value2),
        };
      }
      if (value1 === value2) {
        return {
          type: "Equal",
          key: key,
          value: value1,
          children: false,
        };
      }
      if (typeof value1 !== "undefined" && typeof value2 !== "undefined")
        return {
          type: "Updated",
          key: key,
          value1: value1,
          value2: value2,
          children: false,
        };
      if (typeof value1 !== "undefined" && typeof value2 === "undefined")
        return {
          type: "Removed",
          key: key,
          value: value1,
          children: false,
        };
      if (typeof value1 === "undefined" && typeof value2 !== "undefined")
        return {
          type: "Added",
          key: key,
          value: value2,
          children: false,
        };
    })
    .filter((i) => i !== null);
};

export { compareObject };
