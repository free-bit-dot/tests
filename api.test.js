const axios = require('axios');

const BASE_URL = 'https://restful-booker.herokuapp.com';

let response;

beforeEach(async () => {
  response = await axios.get(`${BASE_URL}/booking`);
});

describe('API Integration Tests', () => {
  test('Отримання списку бронювань – статус 200', () => {
    expect(response.status).toBe(200);
  });

  test('Список бронювань не є порожнім', () => {
    expect(response.data.length).toBeGreaterThan(0);
  });

  test('Кожен елемент має поле "bookingid"', () => {
    expect(response.data[0]).toHaveProperty('bookingid');
  });
});
