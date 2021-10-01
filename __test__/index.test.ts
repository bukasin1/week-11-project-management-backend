const app = require('../src/app').default;
import supertest from "supertest";
const {dbConnect, dbDisconnect} = require('../connectdb')

beforeAll(async() => await dbConnect());
afterAll(async() => await dbDisconnect());
describe(`Test for route`, () => {
  test('Test for Post', async() => {
   await supertest(app)
   .post('/postUser')
   .send({
     firstname : "fola",
     lastname: "hanmi",
     role: "DevOps",
     gender: "female",
     location: "Nigeria",
     team: "group B",
     about: "about"
   })
   .expect("Content-type", "application/json; charset=utf-8")
   .then((response: any) => {
    console.log(response.body);
     expect(response.body.firstname).toBe("fola")
   })
  })
test('Test for Put', async()=>{
  await supertest(app)
  .put('/profile/614f809f1637e39596931268')
  .send({
    firstname : "fola",
    lastname: "hanmi",
    role: "DevOps",
    gender: "female",
    location: "Nigeria",
    team: "group B",
    about: "about"
  })
   .expect("Content-type", "application/json")
   .then((response: any) => {
     console.log(response.body);

    expect(response.body.firstname).toBe("fola")
  })
})
})
