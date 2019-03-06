const contentful = require('contentful')

const logger = require('./create-logger')(__filename)

module.exports = fetchPublications

const client = contentful.createClient({
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  space: process.env.CONTENTFUL_SPACE
})

async function fetchPublications () {
  logger.info('Fetching publications from Contentful...')
  try {
    const response = await client.getEntries({
      content_type: 'publication',
      include: 2,
      limit: 500
    })
    logger.info(`Retrieved ${response.total} publications from Contentful`)
    return response.items
  } catch (error) {
    logger.error(`Error retrieving data from Contentful: ${error.message}`)
    process.exit(1)
  }
}
