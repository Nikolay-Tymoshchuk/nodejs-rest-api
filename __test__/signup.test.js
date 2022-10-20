const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const { login: loginService } = require("../src/services/auth");
const { User } = require("../src/db");
require("dotenv").config({ path: "../.env" });

describe("Login Service test", () => {
  const body = {
    email: "test@email.com",
    password: "test123",
  };

  const hashedPassword = bcryptjs.hashSync(body.password, 10);
  const token = "tiktoken";

  const user = {
    _id: "5f7f9c9c9c9c9c9c9c9c9c9c",
    email: body.email,
    password: hashedPassword,
    subscription: "free",
    token,
  };

  jest.spyOn(User, "findOne").mockImplementationOnce(() => user);
  jest.spyOn(jwt, "sign").mockImplementationOnce(() => token);
  jest.spyOn(User, "findByIdAndUpdate").mockImplementationOnce(null);

  let result = {};

  beforeAll(async () => {
    result = await loginService(body);
    return result;
  });

  it("should return status 200", async () => {
    expect(result.status).toBe(200);
  });

  it("The answer should return the token", async () => {
    expect(result.token).toBeDefined();
  });

  it("Email field with data type String", async () => {
    expect(typeof result.user.email).toEqual("string");
  });

  it("Subscription field with data type String", async () => {
    expect(typeof result.user.subscription).toEqual("string");
  });
});
