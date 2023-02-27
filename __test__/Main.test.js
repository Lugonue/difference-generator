import plain from '../src/formatters/plain.js';
import stylish from '../src/formatters/stylish.js';
import genDIffMain from '../src/genDiffMain.js';
import parser from '../src/parsers.js';
import resultDifference from '../__fixtures__/difference.js';
import object1 from '../__fixtures__/object1.js';
import object2 from '../__fixtures__/object2.js';
import plainOutput from '../__fixtures__/plainOutput.js';
import stylishOutput from '../__fixtures__/stylishOutput.js';
import jsonOutput from '../__fixtures__/jsonOutput.js';
import compareObject from '../src/compareObject.js';

const cases = [
  ['__fixtures__/file1.json', '__fixtures__/file2.json'],
  ['__fixtures__/file1.yml', '__fixtures__/file2.yml'],
  ['__fixtures__/file1.json', '__fixtures__/file2.yml'],
  ['__fixtures__/file1.yml', '__fixtures__/file2.json'],
];

test('compareObject', () => {
  expect(compareObject(object1, object2)).toEqual(resultDifference);
});

test.each(cases)('parsers file1 extantion', (i, j) => {
  expect(parser(i)).toEqual(object1);
  expect(parser(j)).toEqual(object2);
});

test('stylish', () => {
  expect(stylish(resultDifference)).toEqual(stylishOutput);
});

test('plain style', () => {
  expect(plain(resultDifference)).toEqual(plainOutput);
});

test.each(cases)('test genDIffMain', (i, j) => {
  expect(genDIffMain(i, j, 'json')).toEqual(
    jsonOutput,
  );
  expect(genDIffMain(i, j)).toEqual(
    stylishOutput,
  );
  expect(genDIffMain(i, j, 'plain')).toEqual(
    plainOutput,
  );
});
