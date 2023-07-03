import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    // arrange
    const value = { a: 2, b: 4, action: Action.Add };
    // act
    const result = simpleCalculator(value);
    // assert
    expect(result).toBe(6);
  });

  test('should subtract two numbers', () => {
    // arrange
    const value = { a: 2, b: 4, action: Action.Subtract };
    // act
    const result = simpleCalculator(value);
    // assert
    expect(result).toBe(-2);
  });

  test('should multiply two numbers', () => {
    // arrange
    const value = { a: 2, b: 4, action: Action.Multiply };
    // act
    const result = simpleCalculator(value);
    // assert
    expect(result).toBe(8);
  });

  test('should divide two numbers', () => {
    // arrange
    const value = { a: 2, b: 4, action: Action.Divide };
    // act
    const result = simpleCalculator(value);
    // assert
    expect(result).toBe(0.5);
  });

  test('should exponentiate two numbers', () => {
    // arrange
    const value = { a: 2, b: 4, action: Action.Exponentiate };
    // act
    const result = simpleCalculator(value);
    // assert
    expect(result).toBe(16);
  });

  test('should return null for invalid action', () => {
    // arrange
    const value = { a: 2, b: 4, action: 'invalid' };
    // act
    const result = simpleCalculator(value);
    // assert
    expect(result).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    // arrange
    const value = { a: null, b: 'invalid', action: Action.Add };
    // act
    const result = simpleCalculator(value);
    // assert
    expect(result).toBe(null);
  });
});
