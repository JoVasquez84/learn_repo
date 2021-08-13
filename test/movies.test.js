const app = require('../app');
const supertest = require('supertest')
const request = supertest(app);

describe("GET /movies", () => {
  test("get all movies from /movies", async () => {
    const response = await request.get("/movies");
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(13);
  });
});

describe("POST /movies", () => {
  it("accept the proper data to add to database", async () => {
    await request
      .post("/movies")
      .send({
        title: "From Paris With Returning",
        runtime: 94,
        release_year: 2010,
        director: "Pierre Morel",
      })
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        console.log(res.res.text);
        expect(JSON.parse(res.res.text)).toHaveLength(1);
      });
  });
});

afterAll(() => console.log('1 - afterAll'));
