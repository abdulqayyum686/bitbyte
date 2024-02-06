import mongoose from "mongoose";
const MONGO_URL = process.env.DATABASE_URI;

if (!MONGO_URL) {
  throw new Error(
    "Please define the MONGO_URL environment variable inside .env.local"
  );
}
console.log(MONGO_URL);
async function dbConnect() {
  const con = await mongoose.connect(MONGO_URL);
  return con;
}

export default dbConnect;
