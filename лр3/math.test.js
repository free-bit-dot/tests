const { subtract, multiply, divide } = require('./math');

describe('Math functions', () => {
  test('subtracts 5 - 2 to equal 3', () => {
    expect(subtract(5, 2)).toBe(3);
  });

  test('multiplies 3 * 4 to equal 12', () => {
    expect(multiply(3, 4)).toBe(12);
  });

  test('divides 10 / 2 to equal 5', () => {
    expect(divide(10, 2)).toBe(5);
  });

  test('divides by 0 returns Infinity', () => {
    expect(divide(5, 0)).toBe(Infinity);
  });
});
