import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const url = process.env.MONGO_URL_TEST as string;
export async function run() {
  //  Connect to MongoDB
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
}
// const opts = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };
