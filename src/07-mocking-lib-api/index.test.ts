// Uncomment the code below and write your tests
import axios from 'axios';
// import lodash from 'lodash';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    //arrange
    const axiosCreateSpy = jest.spyOn(axios, 'create');
    //act
    await throttledGetDataFromApi('/');
    //assert
    expect(axiosCreateSpy).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    //arrange
    // const axiosGetSpy = jest.spyOn(lodash, 'throttle');
    // //act
    // const promise = await throttledGetDataFromApi('/posts');
    // jest.advanceTimersByTime(5000);
    // await promise;
    // //assert
    // expect(axiosGetSpy).toHaveBeenCalledWith('/posts');
  });

  test('should return response data', async () => {
    //arrange
    const expectedResponse = {
      userId: 1,
      id: 1,
      title: 'delectus aut autem',
      completed: false,
    };
    //act
    const response = await throttledGetDataFromApi('/todos/1');
    //assert
    expect(response).toEqual(expectedResponse);
  });
});
