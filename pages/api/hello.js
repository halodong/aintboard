const convert = require('xml-js')
const { fetch } = require('promise-path')

export default async (req, res) => {
  const collection = await retryCollection('canyons')

  res.status(200).json(collection)
}

async function retryCollection (username, retries = 2) {
  const response = await downloadCollection(username)
  if (response.message) {
    report(response.message)
    if (retries > 0) {
      return retryCollection(username, retries - 1)
    } else {
      return {
        items: []
      }
    }
  } else {
    return response
  }
}

async function downloadCollection (username) {
  // const collectionUrl = `https://www.boardgamegeek.com/xmlapi2/collection?username=${username}`
  const collectionUrl = `https://www.boardgamegeek.com/xmlapi2/search?query=${username}&type=boardgame`

  try {
    const response = await fetch(collectionUrl)
    const collection = await convert.xml2json(response, { compact: true, alwaysArray: true, ignoreDeclaration: true, nativeType: true })
    return collection
  } catch (ex) {
    console.log('Error fetching data:', ex, ex.stack)
  }
}