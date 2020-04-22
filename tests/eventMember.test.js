const request = require("supertest");
const server = require("../server");

const db = require("../config/dbConfig.js");

beforeAll(async () => {
  await db("event_member").insert([{ event_id: 2 }, { user_id: 1 }]);
});

afterAll(async () => {
  await db.raw(`TRUNCATE TABLE users RESTART IDENTITY CASCADE`);
});

xdescribe("event_member endpoints", () => {
  describe("GET /", () => {
    it("should return 200", async () => {
      const response = await request(server).get("/api/member").expect(200);
    });
    it("should be an object/array", async () => {
      const response = await request(server).get("/api/member").expect(200);
      expect(typeof response.body).toBe("object");
    });
    it("should return a length of 3", async () => {
      const response = await request(server).get("/api/member").expect(200);
      expect(response.body.length).toBe(3);
    });
  });

  describe("POST /", () => {
    it("Adds a member to the db", async () => {
      const member = { event_id: 2, user_id: 1 };
      const posting = await request(server)
        .post("/api/member/")
        .send(member)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(201);

      expect(posting.body).toEqual([4]);
    });
  });

  describe("DELETE /", () => {
    it("should return 204", async () => {
      const id = { id: 1 };
      const deleting = await request(server)
        .delete("/api/member")
        .send(id)
        .expect(201);
    });
  });
});
