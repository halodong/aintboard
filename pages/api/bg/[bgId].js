const { fetch } = require("promise-path");
const convert = require("xml-js");

async function retryItem(bgId, retries = 2) {
  const response = await downloadItem(bgId);
  if (response.message) {
    // response.message could be an error here
    if (retries > 0) {
      return retryItem(bgId, retries - 1);
    } else {
      return {
        items: [],
      };
    }
  } else {
    return response;
  }
}

async function downloadItem(bgId) {
  const url = `https://www.boardgamegeek.com/xmlapi2/thing?id=${bgId}`;

  try {
    const response = await fetch(url);
    const collection = await convert.xml2json(response, {
      compact: true,
      alwaysArray: true,
      ignoreDeclaration: true,
      nativeType: true,
    });
    return collection;
  } catch (ex) {
    console.log("Error fetching bg data:", ex, ex.stack);
  }
}

const collect = async (req, res) => {
  const collection = await retryItem(req.query.bgId);

  res.status(200).json(collection);
};

export default collect;
