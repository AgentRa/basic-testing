// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

//arrange
const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 4, b: 2, action: Action.Subtract, expected: 2 },
  { a: 5, b: 2, action: Action.Subtract, expected: 3 },
  { a: 6, b: 2, action: Action.Subtract, expected: 4 },
  { a: 7, b: 2, action: Action.Multiply, expected: 14 },
  { a: 8, b: 2, action: Action.Multiply, expected: 16 },
  { a: 9, b: 2, action: Action.Multiply, expected: 18 },
  { a: 10, b: 2, action: Action.Divide, expected: 5 },
  { a: 11, b: 2, action: Action.Divide, expected: 5.5 },
  { a: 12, b: 2, action: Action.Divide, expected: 6 },
  { a: 13, b: 2, action: Action.Exponentiate, expected: 169 },
  { a: 14, b: 2, action: Action.Exponentiate, expected: 196 },
  { a: 15, b: 2, action: Action.Exponentiate, expected: 225 },
  { a: 16, b: 2, action: 'unknown', expected: null },
  { a: 16, b: 2, action: undefined, expected: null },
  { a: 16, b: 2, action: null, expected: null },
  { a: '16', b: 2, action: Action.Add, expected: null },
  { a: 'one', b: 2, action: Action.Add, expected: null },
  { a: undefined, b: 2, action: Action.Add, expected: null },
  { a: 16, b: '2', action: Action.Add, expected: null },
  { a: 16, b: 'two', action: Action.Add, expected: null },
  { a: 16, b: undefined, action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should return $expected when called with [$a], [$b] and [$action] action',
    ({ a, b, action, expected }) => {
      //act
      const result = simpleCalculator({ a, b, action });
      //assert
      expect(result).toBe(expected);
    },
  );
});
