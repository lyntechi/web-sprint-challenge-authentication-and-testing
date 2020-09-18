const supertest = require("supertest");
const server = require("./server");
const db = require("../database/dbConfig");
const bcryptjs = require("bcryptjs");
const Users = require("../users/users-model");

// describe("server", () => {
//   describe("GET /", () => {
//     it("should return HTTP status code 200", () => {
//       return supertest(server)
//         .get("/")
//         .then((res) => {
//           expect(res.status).toBe(200);
//         });
//     });
//   });
// });

// describe("GET /users ", () => {
//     it("should return 200 when getting users", () => {
//         return supertest(server)
//             .get("/api/users/")
//             .then(res => {
//                 expect(res.status).toBe(200);
//             });
//     });
// it("should fail with code 400 if passed incorrect data", () => {
//     return supertest(server)
//         .post("/hobbits")
//         .send({})
//         .then(res => {
//             expect(res.status).toBe(200);
//         });
// });
// it("should insert the hobbit into the database", (req, res) => {
// });
// });

describe("auth-router", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });

  describe("POST to /api/auth/register", () => {
    it("should respond with status code 201 created", async () => {
      await supertest(server)
        .post("/api/auth/register")
        .send({ username: "lyntechi", password: "secretpass" })
        .then((res) => {
          expect(res.status).toBe(201);
        });
    });
    it("should contain user account created", () => {
      return supertest(server)
        .post("/api/auth/register")
        .send({ username: "lyntechi", password: "secretpass" })
        .then((res) => {
          console.log("res body", res.body);
          expect(res.body.message).toContain(
            "user account successfully created"
          );
        });
    });
  });

  describe("POST to /api/auth/login", () => {
    beforeEach(async () => {
      const user = { username: "lyntechi", password: "secretpass" };
      const hash = bcryptjs.hashSync(user.password, 8);
      user.password = hash;

      await db("users").truncate();
      await db("users").insert(user);
    });
    it("should respond with status 200 OK", () => {
      return supertest(server)
        .post("/api/auth/login")
        .send({ username: "lyntechi", password: "secretpass" })
        .then((res) => {
          expect(res.status).toBe(200);
        });
    });
    it("should respond with a welcome message", () => {
      return supertest(server)
        .post("/api/auth/login")
        .send({ username: "lyntechi", password: "secretpass" })
        .then((res) => {
          expect(res.body.message).toContain(
            "Welcome and enjoy these Dad jokes!"
          );
        });
    });
  });
});
