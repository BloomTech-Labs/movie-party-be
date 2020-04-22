import server from "../server.js";
import request from "supertest";
import db from "../config/dbConfig";

afterAll(async () => {
  await db.raw(`TRUNCATE TABLE users RESTART IDENTITY CASCADE`);
});

describe("root", () => {
  test("work should be testing", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });
});

describe("register user", () => {
  it("should return status 201", async () => {
    const res = await request(server).post("/api/register").send({
      first_name: "marge",
      last_name: "kofman",

      email: "marge@gmail.com",
      password: "password",
    });
    expect(res.status).toBe(201);
    expect(res.type).toBe("application/json");
    expect(res.body.id).not.toBeNaN();
  });
});

describe("login works", () => {
  it("should return status 200", async () => {
    const res = await request(server).post("/api/login").send({
      first_name: "marge",
      last_name: "kofman",
      email: "marge@gmail.com",
      password: "password",
    });

    expect(res.status).toBe(200);
  });

  it("should return a token", async () => {
    const res = await request(server).post("/api/login").send({
      first_name: "marge",
      last_name: "kofman",
      email: "marge@gmail.com",
      password: "password",
    });

    expect(res.body.token).toBeTruthy();
  });

  it("should return json", async () => {
    const res = await request(server).post("/api/login").send({
      first_name: "marge",
      last_name: "kofman",
      email: "marge@gmail.com",
      password: "password",
    });

    expect(res.type).toBe("application/json");
  });
});
