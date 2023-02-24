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

const parserCase1 = ['__fixtures__/file1.json', '__fixtures__/file1.yml'];
const parserCase2 = ['__fixtures__/file2.json', '__fixtures__/file2.yml'];

test('compareObject', () => {
  expect(compareObject(object1, object2)).toEqual(resultDifference);
});

test.each(parserCase1)('parsers file1 extantion', (i) => {
  expect(parser(i)).toEqual(object1);
});

test.each(parserCase2)('parsers file2 extantion', (i) => {
  expect(parser(i)).toEqual(object2);
});

test('stylish', () => {
  expect(stylish(resultDifference)).toEqual(stylishOutput);
});

test('plain style', () => {
  expect(plain(resultDifference)).toEqual(plainOutput);
});

test('jtest genDIffMain', () => {
  expect(genDIffMain(parserCase1[0], parserCase2[1], 'json')).toEqual(
    jsonOutput,
  );
  expect(genDIffMain(parserCase1[0], parserCase2[1])).toEqual(
    stylishOutput,
  );
  expect(genDIffMain(parserCase1[0], parserCase2[1], 'plain')).toEqual(
    plainOutput,
  );
});
