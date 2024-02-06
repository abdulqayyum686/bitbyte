// import mongoose from "mongoose";
// const MONGO_URL = process.env.DATABASE_URI;

// if (!MONGO_URL) {
//   throw new Error(
//     "Please define the MONGO_URL environment variable inside .env.local"
//   );
// }
// console.log(MONGO_URL);
// async function dbConnect() {
//   const con = await mongoose.connect(MONGO_URL);
//   return con;
// }

// export default dbConnect;

import mongoose from "mongoose";
const MONGO_URL = process.env.DATABASE_URI;

if (!MONGO_URL) {
  throw new Error(
    "Please define the MONGO_URL environment variable inside .env.local"
  );
}

// Set strictQuery to true to suppress the deprecation warning
mongoose.set("strictQuery", true);

async function dbConnect() {
  // Check if mongoose instance is already connected to avoid multiple connections
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  return mongoose.connect(MONGO_URL, {
    // Additional options can be specified here
  });
}

export default dbConnect;
