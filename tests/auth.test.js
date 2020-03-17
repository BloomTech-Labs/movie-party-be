// const esmImport = require('esm')(module);
import server from '../server.js';
import request from 'supertest';
import db from '../config/dbConfig';

// const request = esmImport("supertest");
// const server = esmImport("../server");

// const db = esmImport("../config/dbConfig.js");

afterAll(async () => {
 await db.raw(`TRUNCATE TABLE users RESTART IDENTITY CASCADE`);
});

describe("root", () => {
  test("work should be testing", () => {
    expect(process.env.DB_ENV).toBe("testing");
  })
})

describe("register user", () => {
  it("should return status 201", async () => {
    const res = await request(server)
      .post('/api/register')
      .send({
       first_name: "bart", last_name: "kofman", email: "bart@gmail.com",
        password: "password"
      });
    expect(res.status).toBe(201)
    expect(res.type).toBe("application/json");
    expect(res.body.id).not.toBeNaN();

  })

  // beforeEach(async () => {
  //   await db("users").truncate();
  // });
 });

//   it("should return json", async () => {
//     const res = await request(server)
//       .post("/api/register")
//       .send({
//        first_name: "bart", last_name: "kofman", email: "bart2@gmail.com",
//         password: "password"
//       });
//     expect(res.type).toBe("application/json");
//   })


//   it("returns an id", async () => {
//     const res = await request(server)
//       .post("/api/register")
//       .send({
//        first_name: "bart", last_name: "kofman", email: "bart3@gmail.com",
//         password: "password"
//       });
//     expect(res.body.id).not.toBeNaN();
//   });

//   beforeEach(async () => {
//     await db("users").truncate();
//   });
// });

describe("login works", () => {
  it("should return status 200", async () => {
    const res = await request(server)
      .post("/api/login")
      .send({ first_name: "bart", last_name: "kofman", email: "bart@gmail.com", password: "password" });

    expect(res.status).toBe(200);
  });


  it("should return a token", async () => {
    const res = await request(server)
      .post("/api/login")
      .send({ first_name: "bart", last_name: "kofman", email: "bart@gmail.com", password: "password" });

    expect(res.body.token).toBeTruthy();
  });

  it("should return json", async () => {
    const res = await request(server)
      .post('/api/login')
      .send({ first_name: "bart", last_name: "kofman", email: "bart@gmail.com", password: "password" });

    expect(res.type).toBe("application/json");
  })
})