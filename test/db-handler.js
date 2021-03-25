const { MongoMemoryServer } = require("mongodb-memory-server");

const mongod = new MongoMemoryServer();

let mongodb = require("mongodb");
let mClient = mongodb.MongoClient;
let mongoClient;
let mongoDb;

/**
 * Connect to the in-memory database.
 */
module.exports.connect = async () => {
  const uri = await mongod.getUri();

  mongoClient = new mClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await mongoClient.connect();

  mongoDb = mongoClient.db("aintboard_test");

  return mongoDb;
};

module.exports.db = mongoDb;

/**
 * Drop database, close the connection and stop mongod.
 */
module.exports.closeDatabase = async () => {
  await mongoDb.dropDatabase();
  await mongoClient.close();
  await mongod.stop();
};

/**
 * Remove all the data for all db collections.
 */
module.exports.clearDatabase = async () => {
  const collections = mongoClient.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
};
