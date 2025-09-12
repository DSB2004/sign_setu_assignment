"use server";

import mongoose, { Mongoose } from "mongoose";
const MONGODB_URI = process.env.MONGODB_URL || "";
if (!MONGODB_URI) throw new Error("MONGODB_URL not set in environment");

let cached: Mongoose | null = null;

async function _connect() {
  return await mongoose.connect(MONGODB_URI, {
    maxPoolSize: 10,
    minPoolSize: 2,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  });
}

export async function getDB() {
  if (cached !== null) {
    console.info("cached connection called");
    return cached;
  }

  try {
    cached = await _connect();
    console.log(`MongoDB connected: ${cached.connection.name}`);
  } catch (err) {
    cached = null;
    console.error("MongoDB connection error:", err);
    return { success: false, message: "Internal Server Error" };
  }

  return cached;
}
