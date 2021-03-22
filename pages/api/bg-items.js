const { fetch } = require("promise-path");
const convert = require("xml-js");

async function retryItems(itemName, retries = 2) {
  const response = await downloadItems(itemName);
  if (response.message) {
    if (retries > 0) {
      return retryItems(itemName, retries - 1);
    } else {
      return {
        items: [],
      };
    }
  } else {
    return response;
  }
}

async function downloadItems(itemName) {
  const converted = itemName.replace(/:\s*/g, " ");
  const url = `https://www.boardgamegeek.com/xmlapi2/search?query=${converted}&type=boardgame`;

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
    console.log("Error fetching data:", ex, ex.stack);
  }
}

const collect = async (req, res) => {
  const collection = await retryItems(req.query.itemName);

  res.status(200).json(collection);
};

export default collect;
