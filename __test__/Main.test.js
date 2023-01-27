import { compareObject } from "../src/compareObject";
import { plain } from "../src/formatters/plain";
import { stylish } from "../src/formatters/stylish";
import genDIffMain from "../src/genDiffMain";
import { parser } from "../src/parsers";
import { resultDifference } from "../__fixtures__/difference";
import { object1 } from "../__fixtures__/object1";
import { object2 } from "../__fixtures__/object2";
import { plainOutput } from "../__fixtures__/plainOutput";
import { stylishOutput } from "../__fixtures__/stylishOutput";
import { jsonOutput } from "../__fixtures__/jsonOutput";

const parserCase1 = [
  "__fixtures__/file1.json",
  "__fixtures__/file1.yml",
];
const parserCase2 = [
  "__fixtures__/file2.json",
  "__fixtures__/file2.yml",
];


test("test compareFiles", () => {
  expect(compareObject(object1, object2)).toEqual(resultDifference);
});

test.each(parserCase1)("test parsers file1 extantion", (i) => {
  expect(parser(i)).toEqual(object1);
});

test.each(parserCase2)("test parsers file2 extantion", (i) => {
  expect(parser(i)).toEqual(object2);
});

test("test stylish", () => {
  expect(stylish(resultDifference)).toEqual(stylishOutput);
});

test("test plain style", () => {
  expect(plain(resultDifference)).toEqual(plainOutput);
});

test("test json formater", () => {
  expect(genDIffMain(parserCase1[0], parserCase2[1], 'json')).toEqual(jsonOutput);
}) 