/**
 * check-db.js
 * Run with: node check-db.js
 * Checks MongoDB connection and prints result, then exits.
 */
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌  MONGO_URI is not set in .env");
  process.exit(1);
}

console.log("🔍  Checking MongoDB connection...");
console.log(`📡  URI (masked): ${MONGO_URI.replace(/:([^@]+)@/, ":<password>@")}`);

const start = Date.now();

try {
  await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 8000 });

  const { host, port, name } = mongoose.connection;
  const elapsed = Date.now() - start;

  console.log("\n✅  MongoDB Connected Successfully!");
  console.log(`   Host     : ${host}`);
  console.log(`   Port     : ${port}`);
  console.log(`   Database : ${name}`);
  console.log(`   Latency  : ${elapsed}ms`);

  // Quick ping
  await mongoose.connection.db.admin().ping();
  console.log("   Ping     : OK ✓");

  await mongoose.disconnect();
  console.log("\n🔌  Disconnected cleanly. DB is reachable and healthy.\n");
  process.exit(0);
} catch (err) {
  const elapsed = Date.now() - start;
  console.error(`\n❌  Connection FAILED after ${elapsed}ms`);
  console.error(`   Reason: ${err.message}`);

  if (err.message.includes("ENOTFOUND") || err.message.includes("ECONNREFUSED")) {
    console.error("   → Network issue or wrong host in MONGO_URI");
  } else if (err.message.includes("Authentication failed")) {
    console.error("   → Wrong username or password in MONGO_URI");
  } else if (err.message.includes("timed out")) {
    console.error("   → Atlas IP Whitelist may be blocking this IP — add 0.0.0.0/0 in Atlas Network Access");
  }

  process.exit(1);
}
