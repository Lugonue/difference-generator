import { compareFiles } from "../src/compareFiles";

const a = {
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
const b = {
  common: {
    follow: false,
    setting1: "Value 1",
    setting3: null,
    setting4: "blah blah",
    setting5: {
      key5: "value5"
    },
    setting6: {
      key: "value",
      ops: "vops",
      doge: {
        wow: "so much"
      }
    }
  },
  group1: {
    foo: "bar",
    baz: "bars",
    nest: "str"
  },
  group3: {
    deep: {
      id: {
        number: 45
      }
    },
    fee: 100500
  }
};

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

})