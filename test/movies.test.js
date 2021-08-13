const app = require('../app');
const supertest = require('supertest')
const request = supertest(app);

describe("Test the root path", () => {
  test("It should response the GET method", async () => {
    const response = await request.get("/movies");
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(13);
  });
});


describe('POST /api/v1/session/api_key', () => {
  it('should create api key', async () => {
  await request
  .post('/movies')
  .send({
    "title": "From Paris With Returning",
    "runtime": 94,
    "release_year": 2010,
    "director": "Pierre Morel"
    })
  .expect('Content-Type', /json/)
  .expect(200)
  .then((res) => {
    console.log(res)
  expect(res.text).to.have.property('id');
  });
  });
  }); 

// async function fetchData(endpoint) {
//   return request
//   .get(endpoint)
//   .set('Accept','application/json')
// }

// describe('the GET /movies path', () => {
//   it('returns all movies', async () => {
//     const response = await fetchData('/movies')
//     expect(response.status).toEqual(200)
//     expect(response.body).toHaveLength(13)
//   });
// });

// describe('the GET /movies path', () => {
//   it('gets the test endpoint', async done => {
//     const response = await request.get('/movies')  
//     expect(response.status).toBe(200)
//     done()
//   })


  // it('returns all movies', async () => {
  //   const response = await fetchData('/movies')
  //   expect(response.status).toEqual(200)
  //   expect(response.body).toHaveLength(13)
  // });
//});


// describe('the GET /movies:id path', () => {
//   it('returns the movies by Id', async () => {
//     const response = await request.get('/movies/1')
//     expect(response.status).toBe(200)
//     expect(response.body).toHaveLength(1)
//   });

//   it('invalid id if input is invalue', async () => {
//     const response = await fetchData('/movies/{')
//     expect(response.status).toEqual(400)
//     expect(response.body.message).toEqual('Invalid ID supplied')
//   });

//   it('returns ID not found if it is not there', async () => {
//     const response2 = await fetchData('/movies/200')
//     expect(response2.status).toEqual(404)
//     expect(response2.body.message).toEqual('Movie ID not found')
//   });
// });


afterAll(() => console.log('1 - afterAll'));
