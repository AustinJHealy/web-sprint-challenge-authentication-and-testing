const request = require("supertest");

const db = require("../database/dbConfig");

const server = require("./server");

describe("end point tests", function () {
  describe("POST /register and POST /login", function () {
    beforeAll(async () => {
      await db("users").truncate();
    });

    it("should return status 500", function () {
      return request(server)
        .post("/api/auth/register")
        .send({ username: "JohnDoe12", password: "password123" })
        .then((res) => {
          expect(res.status).toBe(500);
        });
    });
    it("response type should match json", function () {
      return request(server)
        .post("/api/auth/register")
        .send({ username: "JohnDoe321", password: "password321" })
        .then((res) => {
          expect(res.type).toMatch(/json/i);
        });
    });
  });
});
