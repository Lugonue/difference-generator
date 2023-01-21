import { plain } from "../src/formatters/plain"


const a = 
`Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`

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


test(' test plain style', () => {
    const b = plain(c);
    expect(b).toEqual(a);
} )