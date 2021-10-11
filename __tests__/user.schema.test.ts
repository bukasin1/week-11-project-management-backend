import {beforeAll, afterAll, describe, test, expect} from '@jest/globals'
import User from '../src/models/userschema';

describe('Test user schema', () => {
  test('firstname', () => {
    const firstname = User.schema.obj.firstname;
    expect(firstname).toEqual({
      type: String,
      required: true,
      trim: true,
    });
  });
  test('lastname', () => {
    const lastname = User.schema.obj.lastname;
    expect(lastname).toEqual({
      type: String,
      required: true,
      trim: true,
    });
  });
  test('email', () => {
    const email = User.schema.obj.email;
    expect(email).toEqual({
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    });
  });
  test('password', () => {
    const password = User.schema.obj.password;
    expect(password).toEqual({
      type: String,
      trim: true,
    });
  });
  test('gender', () => {
    const gender = User.schema.obj.gender;
    expect(gender).toEqual({
      type: String,
      enum: ['male', 'female'],
    });
  });
  test('role', () => {
    const role = User.schema.obj.role;
    expect(role).toEqual({
      type: String,
    });
  });
  test('location', () => {
    const location = User.schema.obj.location;
    expect(location).toEqual({
      type: String,
    });
  });
  test('teams', () => {
    const teams = User.schema.obj.teams;
    expect(teams).toEqual({
      type: [String],
    });
  });
  test('about', () => {
    const about = User.schema.obj.about;
    expect(about).toEqual({
      type: String,
    });
  });
  test('isVerified', () => {
    const isVerified = User.schema.obj.isVerified;
    expect(isVerified).toEqual({
      type: Boolean,
      default: false,
    });
  });
  test('avater', () => {
    const avatar = User.schema.obj.avatar;
    expect(avatar).toEqual({
      type: String,
      contentType: String,
    });
  });
  test('resetpasswordtoken', () => {
    const resetpasswordtoken = User.schema.obj.resetpasswordtoken;
    expect(resetpasswordtoken).toEqual({
      type: String,
    });
  });
  test('resetpasswordxpires', () => {
    const resetpasswordexpires = User.schema.obj.resetpasswordexpires;
    expect(resetpasswordexpires).toEqual({
      type: String,
    });
  });
});

//Setup connection to database

// beforeAll(async () => await connect());
// beforeEach(async () => await clear());
// afterAll(async () => await close());
