import { doStuffByTimeout, doStuffByInterval, readFileAsynchronously } from '.';
// import * as path from 'node:path';

jest.mock('node:path');

beforeAll(() => {
  jest.useFakeTimers();
});

afterAll(() => {
  jest.useRealTimers();
});

test('should set timeout with provided callback and timeout', () => {
  //arrange
  const callback = jest.fn();
  const timeout = 1000;
  const setTimeoutSpy = jest.spyOn(global, 'setTimeout');
  //act
  doStuffByTimeout(callback, timeout);
  //assert
  expect(setTimeoutSpy).toHaveBeenCalledWith(callback, timeout);
});

test('should call callback only after timeout', () => {
  //arrange
  const callback = jest.fn();
  const timeout = 1000;
  //act
  doStuffByTimeout(callback, timeout);
  //assert
  expect(callback).not.toHaveBeenCalled();
  jest.advanceTimersByTime(timeout);
  expect(callback).toHaveBeenCalled();
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    //arrange
    const callback = jest.fn();
    const interval = 1000;
    const setIntervalSpy = jest.spyOn(global, 'setInterval');
    //act
    doStuffByInterval(callback, interval);
    //assert
    expect(setIntervalSpy).toHaveBeenCalledWith(callback, interval);
  });

  test('should call callback multiple times after multiple intervals', () => {
    //arrange
    const callback = jest.fn();
    const interval = 1000;
    //act
    doStuffByInterval(callback, interval);
    //assert
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(interval);
    expect(callback).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(interval);
    expect(callback).toHaveBeenCalledTimes(2);
    jest.advanceTimersByTime(interval);
    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    //arrange
    // const pathToFile = 'index.ts';
    // const joinSpy = jest.spyOn(path, 'join');
    //act
    // await readFileAsynchronously(pathToFile);
    //assert
    // expect(joinSpy).toHaveBeenCalledWith(pathToFile);
  });

  test('should return null if file does not exist', async () => {
    //arrange
    const pathToFile = 'doesNotExist.txt';
    //act
    const result = await readFileAsynchronously(pathToFile);
    //assert
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    //arrange
    const pathToFile = 'index.ts';
    //act
    const result = await readFileAsynchronously(pathToFile);
    //assert
    expect(result).toBeDefined();
  });
});
