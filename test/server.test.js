const tap = require("tap");
const supertest = require("supertest");
const app = require("../app");

const server = supertest(app);

let token = "";
let transactionId = "";

/*
==================================
USER REGISTER
==================================
*/

tap.test("POST /users - register user", async (t) => {
  const res = await server.post("/users").send({
    name: "test",
    email: "test@gmail.com",
    password: "123456",
  });

  t.ok(res.status === 201 || res.status === 200);
});

/*
==================================
USER LOGIN
==================================
*/

tap.test("POST /users/login", async (t) => {
  const res = await server.post("/users/login").send({
    email: "test@gmail.com",
    password: "123456",
  });
//   console.log("token", res.body.token);
  token = res.body.token;

  t.equal(res.status, 200);
  t.ok(token);
});

/*
==================================
CREATE TRANSACTION
==================================
*/

tap.test("POST /transactions", async (t) => {
  const res = await server
    .post("/transactions")
    .set("Authorization", `Bearer ${token}`)
    .send({
      type: "income",
      category: "salary",
      amount: 5000,
    });
    // console.log("res",res?._body);
  transactionId = res?._body?.data?._id
  console.log("transactionId1",transactionId)

  t.ok(res.status === 201 || res.status === 200);
  t.ok(transactionId);
});

/*
==================================
GET ALL TRANSACTIONS
==================================
*/

tap.test("GET /transactions", async (t) => {
  const res = await server
    .get("/transactions")
    .set("Authorization", `Bearer ${token}`);

  t.equal(res.status, 200);
});

/*
==================================
GET SINGLE TRANSACTION
==================================
*/

tap.test("GET /transactions/:id", async (t) => {
  const res = await server
    .get(`/transactions/${transactionId}`)
    .set("Authorization", `Bearer ${token}`);

  t.equal(res.status, 200);
});

/*
==================================
UPDATE TRANSACTION
==================================
*/

tap.test("PATCH /transactions/:id", async (t) => {
  const res = await server
    .patch(`/transactions/${transactionId}`)
    .set("Authorization", `Bearer ${token}`)
    .send({
      amount: 4000,
    });

  t.equal(res.status, 200);
});

/*
==================================
SET BUDGET
==================================
*/

tap.test("POST /budget", async (t) => {
  const res = await server
    .post("/budget")
    .set("Authorization", `Bearer ${token}`)
    .send({
      monthlyGoal: 30000,
      savingTarget: 10000,
    });

  t.ok(res.status === 200 || res.status === 201);
});

/*
==================================
GET BUDGET
==================================
*/

tap.test("GET /budget", async (t) => {
  const res = await server
    .get("/budget")
    .set("Authorization", `Bearer ${token}`);

  t.equal(res.status, 200);
});

/*
==================================
GET SUMMARY
==================================
*/

tap.test("GET /summary", async (t) => {
  const res = await server
    .get("/summary")
    .set("Authorization", `Bearer ${token}`);

  t.equal(res.status, 200);
});

/*
==================================
DELETE TRANSACTION
==================================
*/

tap.test("DELETE /transactions/:id", async (t) => {
  const res = await server
    .delete(`/transactions/${transactionId}`)
    .set("Authorization", `Bearer ${token}`);

  t.equal(res.status, 200);
});

/*
==================================
INVALID TRANSACTION ID TEST
==================================
*/

tap.test("GET /transactions/:id", async (t) => {
  const res = await server
    .get(`/transactions/${transactionId}`)
    .set("Authorization", `Bearer ${token}`);

  t.ok(res.status === 400 || res.status === 404);
});

tap.teardown(() => {
  process.exit(0);
});
