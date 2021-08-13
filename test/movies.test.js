const app = require('../app');
const request = require('supertest');

async function fetchData(endpoint) {
  return request(app)
  .get(endpoint)
  .set('Accept','application/json')
}

describe('the GET /movies path', () => {
  it('returns all movies', async () => {
    const response = await fetchData('/movies')
    expect(response.status).toEqual(200)
    expect(response.body).toHaveLength(13)
  });
});

describe('the GET /movies:id path', () => {
  it('returns the movies by Id', async () => {
    const response = await fetchData('/movies/1')
    expect(response.body).toHaveLength(1)
  });

  it('invalid id if input is invalue', async () => {
    const response = await fetchData('/movies/{')
    expect(response.status).toEqual(400)
    expect(response.body.message).toEqual('Invalid ID supplied')
  });

  // it('returns ID not found if it is not there', async () => {
  //   const response2 = await fetchData('/movies/200')
  //   expect(response2.status).toEqual(404)
  //   expect(response2.body.message).toEqual('Movie ID not found')
  // });
});


afterAll(() => console.log('1 - afterAll'));
