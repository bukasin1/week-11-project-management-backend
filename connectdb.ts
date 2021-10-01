require("dotenv").config();
const mongo = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
let mongoServer: any;
export const dbConnect = async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = await mongoServer.getUri();
  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  await mongo.connect(uri, mongooseOpts);
};

export const dbDisconnect = async () => {
  await mongo.connection.dropDatabase();
  await mongo.connection.close();
  await mongoServer.stop();
};
