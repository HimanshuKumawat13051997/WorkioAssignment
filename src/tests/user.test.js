import { expect } from "chai";
import request from "supertest";
import mongoose from "mongoose";
import { app } from "../app.js";
import { user } from "../models/user.model.js";
import dotenv from "dotenv";
import { nanoid } from "nanoid";

dotenv.config();

describe("user API", () => {
  let authToken;
  let userId;
  before(async () => {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  after(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await user.deleteMany({});
    // Create a test user for GET request testing
    const User1 = await user.create({
      email: "test@example.com",
      name: "Test User",
      age: 30,
      city: "Test City",
      zipCode: "12345",
      Token: nanoid(),
    });

    authToken = User1.Token;

    const User2 = await user.create({
      email: "test3@example.com",
      name: "Test User 3",
      age: 30,
      city: "Test City",
      zipCode: "12345",
      Token: nanoid(),
    });

    let UseridExtract = await user.findOne({ email: User2.email });
    userId = UseridExtract._id;
  });

  describe("POST /api/worko/user", () => {
    it("should create a user", async () => {
      const res = await request(app).post("/api/worko/user").send({
        //change email if email is already present
        email: "testtesttest@gmail.com",
        name: "Test hjj user",
        age: 30,
        city: "Test City",
        zipCode: "12345",
      });
      expect(res.statusCode).to.equal(201);
      //change email if email is already present
      expect(res.body).to.have.property("email", "testtesttest@gmail.com");
    });

    it("should return 400 if email is missing", async () => {
      const res = await request(app).post("/api/worko/user").send({
        name: "Test user",
        age: 30,
        city: "Test City",
        zipCode: "12345",
      });
      expect(res.statusCode).to.equal(400);
    });
  });

  describe("Get /api/worko/user", () => {
    it("should return all users", async () => {
      const res = await request(app)
        .get("/api/worko/user")
        .set("Authorization", authToken);

      expect(res.statusCode).to.equal(200);
      expect(res.body).to.be.an("array");
    });
  });

  describe("Get /api/worko/user/:userId", () => {
    it("should return all users", async () => {
      const res = await request(app)
        .get(`/api/worko/user/${userId}`)
        .set("Authorization", authToken);

      expect(res.statusCode).to.equal(200);
      expect(res.body).to.have.property("email", "test3@example.com");
      expect(res.body).to.have.property("name", "Test User 3");
    });

    it("Should return unauthorized if token is not passed", async () => {
      const res = await request(app).get(`/api/worko/user/${userId}`);
      expect(res.statusCode).to.equal(401);
    });

    it("Should 500 if user not found", async () => {
      // change usedid to random
      const invalidUserId = new mongoose.Types.ObjectId();
      const res = await request(app)
        .get(`/api/worko/user/${invalidUserId}`)
        .set("Authorization", authToken);
      expect(res.statusCode).to.equal(500);
    });
  });

  describe("Update req using put to change whole data", () => {
    it("should update user", async () => {
      const res = await request(app)
        .put(`/api/worko/user/${userId}`)
        .set("Authorization", authToken)
        .send({
          //change email if email
          email: "testChanged@gmail.com",
          name: "Test Changed name",
          age: 55,
          city: "Test Changed City",
          zipCode: "12345",
        });

      expect(res.statusCode).to.equal(200);
      expect(res.body).to.have.property("email", "testChanged@gmail.com");
    });
  });

  describe("Update req using patch to change the email", () => {
    it("should update email", async () => {
      const res = await request(app)
        .patch(`/api/worko/user/${userId}`)
        .set("Authorization", authToken)
        .send({
          //change email if email
          email: "TestPatchChange@gmail.com",
        });

      expect(res.statusCode).to.equal(200);
      expect(res.body).to.have.property("email", "TestPatchChange@gmail.com");
    });

    it("should update name", async () => {
      const res = await request(app)
        .patch(`/api/worko/user/${userId}`)
        .set("Authorization", authToken)
        .send({
          //change email if email
          name: "User1234",
        });

      expect(res.statusCode).to.equal(200);
      expect(res.body).to.have.property("name", "User1234");
    });

    it("should return error 404 if token is not passed", async () => {
      const res = await request(app).patch(`/api/worko/user/${userId}`).send({
        //change email if email
        name: "User1234",
      });

      expect(res.statusCode).to.equal(401);
    });
  });
});
