import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');

  return {
    __esModule: true,
    ...originalModule,
    mockOne: jest.fn(),
    mockTwo: jest.fn(),
    mockThree: jest.fn(),
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    //assert
    const consoleSpy = jest.spyOn(console, 'log');
    //act
    mockOne();
    mockTwo();
    mockThree();
    //assert
    expect(consoleSpy).not.toHaveBeenCalled();
  });

  test('unmockedFunction should log into console', () => {
    //assert
    const consoleSpy = jest.spyOn(console, 'log');
    //act
    unmockedFunction();
    //assert
    expect(consoleSpy).toHaveBeenCalled();
  });
});
