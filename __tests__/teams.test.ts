/* eslint-disable @typescript-eslint/no-unused-vars */
import {beforeAll, afterAll, describe, test, expect} from '@jest/globals'
import app from '../src/app'
import supertest from "supertest";
import { dbConnect, dbDisconnect } from '../connectdb';


describe("TEAM TEST", () => {
  test("should allow owner to create a team", async () => {


    /**STEP
     *owner should have signed up
      owner should be logged in
      owner should be
     */

      const createTeam = await Team.create({
      
      })
  })

})
