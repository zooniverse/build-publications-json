require('dotenv').config()

const logger = require('./create-logger')(__filename)
const fetchPublications = require('./fetch-publications')
const formatData = require('./format-data')
const saveToS3 = require('./save-to-s3')

main()

async function main () {
  logger.info(`Logger set to level: ${logger.level}`)
  const publications = await fetchPublications().catch(logger.error)
  const formattedPublicationsData = formatData(publications)
  await saveToS3(formattedPublicationsData)
  logger.info('Finished!')
}
