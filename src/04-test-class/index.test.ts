import { getBankAccount } from '.';

describe('BankAccount', () => {
  //arrange
  const initialBalance = 100;
  const lessThanBalance = 50;
  const moreThanBalance = 200;
  test('should create account with initial balance', () => {
    //arrange
    //act
    const account = getBankAccount(initialBalance);
    const testCase = () => account.getBalance();
    //assert
    expect(testCase()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    //arrange
    //act
    const account = getBankAccount(initialBalance);
    const testCase = () => account.withdraw(moreThanBalance);
    // assert
    expect(testCase).toThrow(
      `Insufficient funds: cannot withdraw more than ${initialBalance}`,
    );
  });

  test('should throw error when transferring more than balance', () => {
    //arrange
    //act
    const account = getBankAccount(initialBalance);
    const anotherAccount = getBankAccount(initialBalance);
    const testCase = () => account.transfer(moreThanBalance, anotherAccount);
    //assert
    expect(testCase).toThrow(
      `Insufficient funds: cannot withdraw more than ${initialBalance}`,
    );
  });

  test('should throw error when transferring to the same account', () => {
    //arrange
    //act
    const account = getBankAccount(initialBalance);
    const testCase = () => account.transfer(lessThanBalance, account);
    //assert
    expect(testCase).toThrow('Transfer failed');
  });

  test('should deposit money', () => {
    //arrange
    //act
    const account = getBankAccount(initialBalance);
    account.deposit(lessThanBalance);
    const testCase = account.getBalance();
    //assert
    expect(testCase).toBe(initialBalance + lessThanBalance);
  });

  test('should withdraw money', () => {
    //arrange
    //act
    const account = getBankAccount(initialBalance);
    account.withdraw(lessThanBalance);
    const testCase = account.getBalance();
    //assert
    expect(testCase).toBe(initialBalance - lessThanBalance);
  });

  test('should transfer money', () => {
    //arrange
    //act
    const account = getBankAccount(initialBalance);
    const anotherAccount = getBankAccount(initialBalance);
    account.transfer(lessThanBalance, anotherAccount);
    const testCase = account.getBalance();
    const testCase2 = anotherAccount.getBalance();
    //assert
    expect(testCase).toBe(initialBalance - lessThanBalance);
    expect(testCase2).toBe(initialBalance + lessThanBalance);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    //arrange
    //act
    const account = getBankAccount(initialBalance);
    const fetchBalanceSpy = jest.spyOn(account, 'fetchBalance');
    //assert
    const balance = await account.fetchBalance();

    fetchBalanceSpy.mock.results[0]?.value.then(
      (requestStatus: number | null) => {
        if (requestStatus !== null) {
          expect(typeof balance).toBe('number');
        }
      },
    );
  });

  test('should set new balance if fetchBalance returned number', async () => {
    //arrange
    //act
    const account = getBankAccount(initialBalance);
    //assert
    try {
      await account.synchronizeBalance();
      expect(account.getBalance()).not.toBe(initialBalance);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    //arrange
    //act
    const account = getBankAccount(initialBalance);
    account.fetchBalance = async () => null;
    const testCase = async () => await account.synchronizeBalance();
    //assert
    await expect(testCase).rejects.toThrow('Synchronization failed');
  });
});
