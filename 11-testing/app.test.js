const request = require("supertest");
const app = require("./app");

// Integration tests hit the actual Express app (in-memory, no real network
// port needed) to verify routes behave correctly end-to-end.
describe("GET /health", () => {
  it("returns status ok", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ status: "ok" });
  });
});

describe("POST /echo", () => {
  it("echoes back the message", async () => {
    const res = await request(app).post("/echo").send({ message: "hi" });
    expect(res.statusCode).toBe(200);
    expect(res.body.echoed).toBe("hi");
  });

  it("rejects missing message with 400", async () => {
    const res = await request(app).post("/echo").send({});
    expect(res.statusCode).toBe(400);
  });
});
