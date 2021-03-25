require("dotenv").config();
let mongodb = require("mongodb");
let mClient = mongodb.MongoClient;

export default async function db() {
  let mongodbUri =
    process.env.ENV === "test"
      ? process.env.TEST_MONGODB_URI
      : process.env.MONGODB_URI;

  let mongoClient = new mClient(mongodbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await mongoClient.connect();

  let mongodbName =
    process.env.ENV === "test" ? process.env.DB_NAME_TEST : process.env.DB_NAME;

  return {
    db: mongoClient.db(mongodbName),
    client: mongoClient,
  };
}
