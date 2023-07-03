// Uncomment the code below and write your tests
import {
  throwError,
  throwCustomError,
  resolveValue,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    //arrange
    const value = 'value';
    //act
    const result = await resolveValue(value);
    // assert
    expect(result).toBe(value);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    // arrange
    const message = 'message';
    // act
    const result = () => throwError(message);
    // assert
    expect(result).toThrow(message);
  });

  test('should throw error with default message if message is not provided', () => {
    // arrange
    let message: string | undefined;
    // act
    const result = () => throwError(message);
    // assert
    expect(result).toThrow('Oops');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    // act
    const result = () => throwCustomError();
    //arrange
    expect(result).toThrow('This is my awesome custom error!');
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    // act
    const result = () => rejectCustomError();
    //arrange
    await expect(result).rejects.toThrow('This is my awesome custom error!');
  });
});
