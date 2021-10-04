//const supertest = require('supertest');
import {beforeAll, beforeEach, afterAll, describe, test, expect} from '@jest/globals'
import supertest from 'supertest';
import mongoose from 'mongoose';
import app from '../src/app';
import User from '../src/models/userschema';
import { run } from './database';
run();
const testUser = {
  firstname: 'firstname',
  lastname: 'lastname',
  email: 'firstname@gmail.com',
  password: 'password',
};
beforeEach(async () => {
  await User.deleteMany();
  await User.create(testUser);
});

afterAll((done) => {
  // Closing the DB connection allows Jest to exit successfully.
  mongoose.connection.close();

  done();
});

describe('Testing user end points', () => {
  test('create a new user', async () => {
    const user = {
      firstname: 'Emeka',
      lastname: 'Idoko',
      email: 'emeka@gmail.com',
      password: 'emeka_45',
    };
    const res = await supertest(app).post('/users/signup').send(user);
    expect(res.statusCode).toEqual(201);
  });

  test('create a new user', async () => {
    const id = 'firstname@gmail.com';
    await supertest(app).post('/users/verify/:id').send(id).expect(200);
  });
});
