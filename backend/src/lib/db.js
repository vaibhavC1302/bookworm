// import mongoose from "mongoose";

// export const connectDB = async () => {
//   try {
//     const cnn = await mongoose.connect(process.env.MONGO_URI);
//     console.log("connected to database", cnn.connection.host);
//   } catch (error) {
//     console.log("Error connecting to database", error);
//     process.exit(1);
//   }
// };

// config/database.js
import mongoose from "mongoose";

// Global cache for mongoose connection
const globalWithMongoose = global;
const cached = globalWithMongoose.mongoose;

if (!cached) {
  globalWithMongoose.mongoose = { conn: null, promise: null };
}

/**
 * Connect to MongoDB with connection caching for serverless environments
 * @returns {Promise<mongoose.Connection>} MongoDB connection
 */
async function dbConnect() {
  const cached = globalWithMongoose.mongoose;

  // If already connected, return the cached connection
  if (cached.conn) {
    console.log("Using cached MongoDB connection");
    return cached.conn;
  }

  // If not connected but a connection promise exists, wait for it
  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Disable mongoose buffering
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    };

    console.log("Creating new MongoDB connection promise");
    cached.promise = mongoose
      .connect(process.env.MONGO_URI, opts)
      .then((mongoose) => {
        console.log("MongoDB connected successfully");
        return mongoose;
      })
      .catch((error) => {
        console.error("MongoDB connection failed:", error);
        cached.promise = null; // Reset promise on failure
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

// Handle application termination
process.on("SIGINT", async () => {
  try {
    await mongoose.connection.close();
    console.log("MongoDB connection closed through app termination");
    process.exit(0);
  } catch (error) {
    console.error("Error closing MongoDB connection:", error);
    process.exit(1);
  }
});

export default dbConnect;
