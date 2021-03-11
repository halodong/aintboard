const convert = require('xml-js')
const { fetch } = require('promise-path')

export default async (req, res) => {
  const collection = await retryItems(req.query.itemName)

  res.status(200).json(collection)
}

async function retryItems (itemName, retries = 2) {
  const response = await downloadItems(itemName)
  if (response.message) {
    report(response.message)
    if (retries > 0) {
      return retryCollection(itemName, retries - 1)
    } else {
      return {
        items: []
      }
    }
  } else {
    return response
  }
}

async function downloadItems (itemName) {
  const url = `https://www.boardgamegeek.com/xmlapi2/search?query=${itemName}&type=boardgame`

  try {
    const response = await fetch(url)
    const collection = await convert.xml2json(response, { compact: true, alwaysArray: true, ignoreDeclaration: true, nativeType: true })
    return collection
  } catch (ex) {
    console.log('Error fetching data:', ex, ex.stack)
  }
}