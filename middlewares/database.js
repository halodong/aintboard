import { MongoClient } from "mongodb";

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentiatlly
 * during API Route usage.
 * https://github.com/vercel/next.js/pull/17666
 */
global.mongo = global.mongo || {};

let indexesCreated = false;
export async function createIndexes(db) {
  await Promise.all([
    db.collection("reviews").createIndex({ createdAt: -1 }),
    db.collection("users").createIndex({ email: 1 }, { unique: true }),
  ]);

  indexesCreated = true;
}

export default async function database(req, _, next) {
  if (!global.mongo.client) {
    let mongodbUri =
      process.env.ENV === "test"
        ? process.env.TEST_MONGODB_URI
        : process.env.MONGODB_URI;

    global.mongo.client = new MongoClient(mongodbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await global.mongo.client.connect();
  }

  req.dbClient = global.mongo.client;

  let mongodbName =
    process.env.ENV === "test" ? process.env.DB_NAME_TEST : process.env.DB_NAME;
  req.db = global.mongo.client.db(mongodbName);

  if (!indexesCreated) await createIndexes(req.db);

  return next();
}
