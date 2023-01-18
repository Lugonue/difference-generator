import { compareFiles } from "../src/compareFiles";



const a = '__test__/__fixtures__/file1.json';
const a1 = '__test__/__fixtures__/file1.yaml';
const a2 = '__test__/__fixtures__/file1.yml';
const b = '__test__/__fixtures__/file2.json';
const b1 = '__test__/__fixtures__/file2.yaml';
const c = {
    common: {
      follow: [undefined, false],
      setting1: 'Value 1',
      setting2: [200, undefined],
      setting3: [true, null],
      setting4: [undefined, 'blah blah'],
      setting5: [undefined, { key5: 'value5' }],
      setting6: { doge: { wow: ['', "so much"] }, key: 'value', ops: [undefined, 'vops'] }
    },
    group1: { baz: ['bas', 'bars'], foo: 'bar', nest: [{ key: 'value' }, 'str'] },
    group2: [{ abc: 12345, deep: { id: 45 } }, undefined],
    group3: [
      undefined,
      {
        deep: {
          id: {
            number: 45
          }
        },
        fee: 100500
      }
    ]
  }


test('test compareFiles', () => {
    expect(compareFiles(a, b)).toEqual(c);
    expect(compareFiles(a1, b)).toEqual(c);
    expect(compareFiles(a2, b)).toEqual(c);
    expect(compareFiles(a, b1)).toEqual(c);
})