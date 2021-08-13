const app = require('../app');
const request = require('supertest');

describe('the GET /movies path', () => {
  it('returns all movies', async () => {
    const response = await request(app)
    .get('/movies')
    .expect(200);
    expect(response.body).toHaveLength(3);
  });
});