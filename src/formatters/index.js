import { plain } from "./plain.js";
import { stylish } from "./stylish.js";

const format = (data, formatName) => {
  switch (formatName) {
    case 'stylish': return stylish(data);
    case 'plain': return plain(data);
    default: return "Error, incorrect format name";
  }
};

export { format };
