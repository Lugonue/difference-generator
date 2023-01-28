const resultDifference = [
  {
    type: 'node',
    key: 'common',
    children: [
      {
        type: 'Added', key: 'follow', value: false, children: false,
      },
      {
        type: 'Equal', key: 'setting1', value: 'Value 1', children: false,
      },
      {
        type: 'Removed', key: 'setting2', value: 200, children: false,
      },
      {
        type: 'Updated',
        key: 'setting3',
        value1: true,
        value2: null,
        children: false,
      },
      {
        type: 'Added', key: 'setting4', value: 'blah blah', children: false,
      },
      {
        type: 'Added',
        key: 'setting5',
        value: { key5: 'value5' },
        children: false,
      },
      {
        type: 'node',
        key: 'setting6',
        children: [
          {
            type: 'node',
            key: 'doge',
            children: [
              {
                type: 'Updated',
                key: 'wow',
                value1: '',
                value2: 'so much',
                children: false,
              },
            ],
          },
          {
            type: 'Equal', key: 'key', value: 'value', children: false,
          },
          {
            type: 'Added', key: 'ops', value: 'vops', children: false,
          },
        ],
      },
    ],
  },
  {
    type: 'node',
    key: 'group1',
    children: [
      {
        type: 'Updated',
        key: 'baz',
        value1: 'bas',
        value2: 'bars',
        children: false,
      },
      {
        type: 'Equal', key: 'foo', value: 'bar', children: false,
      },
      {
        type: 'Updated',
        key: 'nest',
        value1: { key: 'value' },
        value2: 'str',
        children: false,
      },
    ],
  },
  {
    type: 'Removed',
    key: 'group2',
    value: { abc: 12345, deep: { id: 45 } },
    children: false,
  },
  {
    type: 'Added',
    key: 'group3',
    value: { deep: { id: { number: 45 } }, fee: 100500 },
    children: false,
  },
];

export default resultDifference;
