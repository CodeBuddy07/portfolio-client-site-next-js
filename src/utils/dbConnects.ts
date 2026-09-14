import mongoose from 'mongoose';

// Resolved lazily so a missing MONGODB_URI fails the request that needs the
// database, not the build. Route handlers are still collected at build time.
export const dbConnect = async () => {
  if (mongoose.connection.readyState >= 1) return;

  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('Please define the MONGODB_URI environment variable.');

  return mongoose.connect(uri);
};
