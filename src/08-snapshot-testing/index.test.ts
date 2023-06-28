import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    //arrange
    const values = [1, 2, 3];
    //act
    const result = generateLinkedList(values);
    //assert
    expect(result).toStrictEqual({
      next: {
        next: {
          next: { next: null, value: null },
          value: 3,
        },
        value: 2,
      },
      value: 1,
    });
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    //arrange
    const values = [1, 2, 3];
    //act
    const result = generateLinkedList(values);
    //assert
    expect(result).toMatchSnapshot();
  });
});
