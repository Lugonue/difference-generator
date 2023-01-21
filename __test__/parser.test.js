import { parser } from "../src/parsers";

test('get object from file-name', () => {
  const a = '__test__/__fixtures__/file1.json';
  const a1 = '__test__/__fixtures__/file1.yaml';
  const a2 = '__test__/__fixtures__/file1.yml';
  const b = {
    common: {
      setting1: "Value 1",
      setting2: 200,
      setting3: true,
      setting6: {
        key: "value",
        doge: {
          wow: ""
        }
      }
    },
    group1: {
      baz: "bas",
      foo: "bar",
      nest: {
        key: "value"
      }
    },
    group2: {
      abc: 12345,
      deep: {
        id: 45
      }
    }
  };
  expect(parser(a)).toEqual(b);
  expect(parser(a1)).toEqual(b);
  expect(parser(a2)).toEqual(b);
})