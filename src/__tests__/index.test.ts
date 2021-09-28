import app from '../app'
import request from 'supertest';
import { dbConnect, dbDisconnect } from '../tests-utils/dbHandler.utils';

beforeAll(async () => {
  await dbConnect()
})

afterAll(async () => await dbDisconnect());
