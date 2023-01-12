import { compareData } from "../src/flatDiffGen.js";
import { parser } from "../src/parsers.js";


test('get object from file-name', () => {
  const a = '__test__/__fixtures__/file1.json';
  const a1 = '__test__/__fixtures__/file1.yaml';
  const a2 = '__test__/__fixtures__/file1.yml';
  const b = {
    "host": "hexlet.io",
    "timeout": 50,
    "proxy": "123.234.53.22",
    "follow": false
  };
  expect(parser(a)).toEqual(b);
  expect(parser(a1)).toEqual(b);
  expect(parser(a2)).toEqual(b);
})


test('compareData', () => {
const a = 
`{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;
  const b = compareData('__test__/__fixtures__/file1.json', '__test__/__fixtures__/file2.json');
  const b1 = compareData('__test__/__fixtures__/file1.yaml', '__test__/__fixtures__/file2.yaml');
  expect(b).toEqual(a);
  expect(b1).toEqual(a);

})