import { compareData, getExtantion, getObject } from "../src/flatDiffGen.js";


test('get object from file-name', () => {
  const a = 'file1.json';
  const b = {
    "host": "hexlet.io",
    "timeout": 50,
    "proxy": "123.234.53.22",
    "follow": false
  };
  expect(getObject(a)).toEqual(b);
})

test('get extension of file', () => {
  const a = ('file1.json');
  const a1 = ('file1.yml');

  expect(getExtantion(a)).toEqual('json');
  expect(getExtantion(a1)).toEqual('yml');


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
  const b = compareData('file1.json', 'file2.json');
  expect(b).toEqual(a);

})