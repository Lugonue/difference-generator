import { compareFiles } from "../src/compareFiles";
import { jsonFormater } from "../src/formatters/jsonFormater";
import { plain } from "../src/formatters/plain";
import { stylish } from "../src/formatters/stylish";
import { parser } from "../src/parsers";

const a = {
  common: {
    setting1: "Value 1",
    setting2: 200,
    setting3: true,
    setting6: {
      key: "value",
      doge: {
        wow: "",
      },
    },
  },
  group1: {
    baz: "bas",
    foo: "bar",
    nest: {
      key: "value",
    },
  },
  group2: {
    abc: 12345,
    deep: {
      id: 45,
    },
  },
};
const b = {
  common: {
    follow: false,
    setting1: "Value 1",
    setting3: null,
    setting4: "blah blah",
    setting5: {
      key5: "value5",
    },
    setting6: {
      key: "value",
      ops: "vops",
      doge: {
        wow: "so much",
      },
    },
  },
  group1: {
    foo: "bar",
    baz: "bars",
    nest: "str",
  },
  group3: {
    deep: {
      id: {
        number: 45,
      },
    },
    fee: 100500,
  },
};

const c = {
  common: {
    follow: [undefined, false],
    setting1: "Value 1",
    setting2: [200, undefined],
    setting3: [true, null],
    setting4: [undefined, "blah blah"],
    setting5: [undefined, { key5: "value5" }],
    setting6: {
      doge: { wow: ["", "so much"] },
      key: "value",
      ops: [undefined, "vops"],
    },
  },
  group1: { baz: ["bas", "bars"], foo: "bar", nest: [{ key: "value" }, "str"] },
  group2: [{ abc: 12345, deep: { id: 45 } }, undefined],
  group3: [
    undefined,
    {
      deep: {
        id: {
          number: 45,
        },
      },
      fee: 100500,
    },
  ],
};

const d = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

const e = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;

const parserCase1 = [
  "__test__/__fixtures__/file1.json",
  "__test__/__fixtures__/file1.yaml",
  "__test__/__fixtures__/file1.yml",
];
const parserCase2 = [
  "__test__/__fixtures__/file2.json",
  "__test__/__fixtures__/file2.yaml",
  "__test__/__fixtures__/file2.yml",
];

const f = `{
  "common": {
      "follow": "was added with value: false",
      "setting2": "was removed",
      "setting3": "was updated from true to null",
      "setting4": "was added with value: 'blah blah'",
      "setting5": "was added with value: [complex value]",
      "setting6": {
          "doge": {
              "wow": "was updated from '' to 'so much'"
          },
          "ops": "was added with value: 'vops'"
      }
  },
  "group1": {
      "baz": "was updated from 'bas' to 'bars'",
      "nest": "was updated from [complex value] to 'str'"
  },
  "group2": "was removed",
  "group3": "was added with value: [complex value]"
}`;

test("test compareFiles", () => {
  expect(compareFiles(a, b)).toEqual(c);
});

test.each(parserCase1)("test parsers file1 extantion", (i) => {
  expect(parser(i)).toEqual(a);
});

test.each(parserCase2)("test parsers file2 extantion", (i) => {
  expect(parser(i)).toEqual(b);
});

test("test stylish", () => {
  expect(stylish(c)).toEqual(d);
});

test(" test plain style", () => {
  expect(plain(c)).toEqual(e);
});

test("test json style", () => {
  expect(jsonFormater(c)).toEqual(f);
});
