const request = require("supertest");

const server = require("./server");

const db = require("./data/db-config");

describe("server", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });
  describe("api/user/register", () => {
    it("should return status 201", () => {
      return request(server)
        .post("/api/user/register")
        .send({
          username: "Andrew",
          password: "Asdfasdf8!"
        })
        .then(response => {
          expect(response.status).toBe(201);
        });
    });
  });
});
